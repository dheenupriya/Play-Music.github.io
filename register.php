<?php
require_once "config.php";

$username = $password = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = "";

if ($_SERVER['REQUEST_METHOD'] == "POST"){

    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Username cannot be blank";
    }
    else{
        $sql = "SELECT id FROM users WHERE username = ?";
        $stmt = mysqli_prepare($conn, $sql);
        if($stmt)
        {
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            // Set the value of param username
            $param_username = trim($_POST['username']);

            // Try to execute this statement
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
                if(mysqli_stmt_num_rows($stmt) == 1)
                {
                    $username_err = "This username is already taken"; 
                }
                else{
                    $username = trim($_POST['username']);
                }
            }
            else{
                echo "Something went wrong";
            }
        }
    }

    mysqli_stmt_close($stmt);


// Check for password
if(empty(trim($_POST['password']))){
    $password_err = "Password cannot be blank";
}
elseif(strlen(trim($_POST['password'])) < 5){
    $password_err = "Password cannot be less than 5 characters";
}
else{
    $password = trim($_POST['password']);
}

// Check for confirm password field
if(trim($_POST['password']) !=  trim($_POST['confirm_password'])){
    $password_err = "Passwords should match";
}


// If there were no errors, go ahead and insert into the database
if(empty($username_err) && empty($password_err) && empty($confirm_password_err))
{
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    if ($stmt)
    {
        mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_password);

        // Set these parameters
        $param_username = $username;
        $param_password = password_hash($password, PASSWORD_DEFAULT);

        // Try to execute the query
        if (mysqli_stmt_execute($stmt))
        {
            header("location: register.php");
        }
        else{
            echo "Something went wrong... cannot redirect!";
        }
    }
    mysqli_stmt_close($stmt);
}
mysqli_close($conn);
}

?>

<!DOCTYPE html>
<html lang = "en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>login</title>
        <link rel="stylesheet" href="login.css">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="file:///E:/fontawesome/css/all.css">
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <img id="image" src="logo.png" width="55" height="50" alt=""><strong
        style="font-family: 'Brush Script MT', cursive; font-size: 30px; position:relative; top:2px;"></style>&nbsp&nbspPlayMusic</strong><br />
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="index.html" style="position: relative; top:4px; font-family: Georgia, 'Times New Roman', Times, serif; font-size:20px; color:dimgrey;">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="bot/templates/chatbot.html"><img src="song description/songs/images/chat.png" width="50px" heigth="50px" alt="" style="position: relative; left:710px; top:2px;"></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="login.php" style="position: relative; left:720px; top:6px; font-family: Georgia, 'Times New Roman', Times, serif; font-size:20px; color:dimgrey;">Login <span class="sr-only"></span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="register.php" style="position: relative; left:730px; top:6px; font-family: Georgia, 'Times New Roman', Times, serif; font-size:20px; color:dimgrey;">Signup <span class="sr-only"></span></a>
        </li>
      </ul>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="logout.php" style="position: relative; right:-360px; top:2px; font-family: Georgia, 'Times New Roman', Times, serif; font-size:20px; color:dimgrey;">Logout<span class="sr-only"></span></a>
        </li>
      </ul>


    </div>
  </nav>

          <br>
          <div class="container mt-4" >
<h3 style="color: white; font-family: Comic Sans MS;">Please Register Here:</h3>
<hr>
<form action="" method="post">
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4" style="color: white; font-family: Comic Sans MS;">Username</label>
      <input type="text" class="form-control" name="username" id="inputEmail4" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4" style="color: white; font-family: Comic Sans MS;">Gender</label>
      <select type="text" class="form-control" id="inputPassword4">
          <option>Gender...</option>
          <option>Female</option>
          <option>Male</option>
          <option>Transgender</option>
</select>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputPassword4" style="color: white; font-family: Comic Sans MS;"> Password</label>
      <input type="password" class="form-control" name ="confirm_password" id="inputPassword" placeholder="Password">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4" style="color: white; font-family: Comic Sans MS;">Confirm Password</label>
      <input type="password" class="form-control" name ="password" id="inputPassword4" placeholder="Confirm Password">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity" style="color: white; font-family: Comic Sans MS;">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState" style="color: white; font-family: Comic Sans MS;">State</label>
      <input type="text" class="form-control">
    </div>
    <div class="form-group col-md-2">
      <label for="inputcountry" style="color: white; font-family: Comic Sans MS;">Country</label>
      <select id="inputcountry" type="text" class="form-control" >
          <option selected style="color: white; font-family: Comic Sans MS;">Choose...</option>
          <option>India</option>
          <option>Pakistan</option>
          <option>Srilanka</option>
          <option>US</option>
          <option>Finland</option>
          <option>NewZealand</option>
          <option>Australia</option>
          <option>Brazil</option>
          <option>Morocco</option>
          <option>Switzerland</option>
          <option>Armenia</option>
          <option>Belgium</option>
          <option>Bhutan</option>
          <option>China</option>
          <option>Canada</option>
          <option>UK</option>
          <option>Cuba</option>
          <option>Germany</option>
          <option>Iceland</option>
          <option>Hungary</option>
          <option>Spain</option>
          <option>Japan</option>
          <option>Thailand</option>
          <option>Philliphines</option>
          <option>Israel</option>
          <option>Kenya</option>
          <option>Malaysia</option>
          <option>Singapore</option>
          <option>North Korea</option>
          <option>Poland</option>
          <option>Seoul</option>
          <option>Vietnam</option>
</select>
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck" style="color: white; font-family: Comic Sans MS;">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit"  class="btn btn-primary" style="color: white; font-family: Comic Sans MS;" onclick="myFunction()">Sign Up</button>
  <div class="signup-link" style="color: antiquewhite;"><a href="login.php" style="font-family: COmic Sans MS; text-decoration: None;">Log In</a></div>
</form>
</div>
   
<script>
function myFunction() {
  alert("Welcome, Your Signed In");
}
</script>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
   
  </body>