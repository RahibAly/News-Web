<?php

require_once('db-config.php');

class app{
    
    public function setRating($conn, $rating, $articleId){
        session_start();   
        $sessionId = session_id();
        $ratingExists = mysqli_query($conn,"select id,user_session_id from rating where article_id = $articleId AND user_session_id='".$sessionId."'") or die(mysqli_error($conn));
        $result = mysqli_num_rows($ratingExists);
        if($result == 0){
            $row = "INSERT INTO rating (rating, article_id, user_session_id) VALUES ('$rating', '$articleId', '$sessionId')";
            $result = mysqli_query($conn, $row) or die(mysqli_error($conn));
        }else if($result == 1){
            $row = "UPDATE rating SET rating='$rating', article_id='$articleId', user_session_id='$sessionId' where article_id = $articleId AND user_session_id='".$sessionId."'";
            $result = mysqli_query($conn, $row) or die(mysqli_error($conn));
        }else{
            $result = false;
        }
        
        return $result;
    }

    public function getRating($conn, $articleId){
        $rating = mysqli_query($conn,"select FLOOR(AVG(rating) + 0.5) as 'avg_rating', count(*) as total from rating where article_id='".$articleId."'") or die(mysqli_error($conn));
        $row = $rating->fetch_assoc();
        return $row;
    }

    public function addComment($conn, $articleId, $name, $email, $comment){
        session_start();   
        $sessionId = session_id();
        $commentExists = mysqli_query($conn,"select id,user_session_id from comments where article_id = $articleId AND user_session_id='".$sessionId."'") or die(mysqli_error($conn));
        $result = mysqli_num_rows($commentExists);
        if($result == 0){
            $row = "INSERT INTO comments (name, email, article_id, comment, user_session_id) VALUES ('$name', '$email', '$articleId', '$comment', '$sessionId')";
            $result = mysqli_query($conn, $row) or die(mysqli_error($conn));
        }else if($result == 1){
            $row = "UPDATE comments SET name='$name', email='$email', comment='$comment', user_session_id='$sessionId' where article_id = $articleId AND user_session_id='".$sessionId."'";
            $result = mysqli_query($conn, $row) or die(mysqli_error($conn));
        }else{
            $result = false;
        }
        
        return $result;
    }

    public function getComments($conn, $articleId){
        $comments = mysqli_query($conn,"select * from comments where article_id='".$articleId."' order by id DESC") or die(mysqli_error($conn));
        $commentsArray = array();
        while($row = mysqli_fetch_assoc($comments)){
            $commentsArray[] = $row;
        }
        return $commentsArray;
    }

}

$response = ['status' => '', 'message' => '', 'data' => []];

if(isset($_REQUEST['action']) && $_REQUEST['action'] == 'setRating'){
    $set = (new app())->setRating($conn, $_REQUEST['rating'], $_REQUEST['articleId']);
    $response['status']     = 'success';
    $response['message']    = 'rating added successfully';
    $response['data']       = $set;
    echo json_encode($response);
} elseif (isset($_REQUEST['action']) && $_REQUEST['action'] == 'getRating'){
    $row = (new app())->getRating($conn, $_REQUEST['articleId']);
    $response['status']     = 'success';
    $response['message']    = 'got rating';
    $response['data']       = $row;
    echo json_encode($response);
} elseif (isset($_REQUEST['action']) && $_REQUEST['action'] == 'addComment'){
    $set = (new app())->addComment($conn, $_REQUEST['articleId'], $_REQUEST['name'], $_REQUEST['email'], $_REQUEST['comment']);
    $response['status']     = 'success';
    $response['message']    = 'comment added successfully';
    $response['data']       = $set;
    echo json_encode($response);
} elseif (isset($_REQUEST['action']) && $_REQUEST['action'] == 'getComments'){
    $row = (new app())->getComments($conn, $_REQUEST['articleId']);
    $response['status']     = 'success';
    $response['message']    = 'got comments';
    $response['data']       = $row;
    echo json_encode($response);
}