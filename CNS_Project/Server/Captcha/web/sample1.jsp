<%-- 
    Document   : sample1
    Created on : Mar 29, 2015, 12:56:58 AM
    Author     : Utkarsh Garg
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html>
    <head>
       <title>CNS Registration Page </title>
      
       <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/ut1.css">
     <script src='https://www.google.com/recaptcha/api.js'></script>
      
    </head>
    <body>

<br>
 <div class="panel panel-danger"></div>
<div class="container">
    <div class='row'>
        <div class='col-md-4'></div>
        <div class='col-md-4'>
          <div class='col-md-12 form-group'>
          <h1>Enter Your Credentials</h1>
         </div>
          <form action="Postvalues" method="post">
              <div style="margin:0;padding:0;display:inline">
                  
            <div class='form-row'>
              <div class='col-xs-12 form-group required'>
                <label  class='control-label'>Full Name</label>
                <input name="name" class='form-control' size='4' type='text'>
              </div>
            </div>
            <div class='form-row'>
              <div class='col-xs-12 form-group card required'>
                <label class='control-label'>UFID</label>
                <input name="ufid" autocomplete='off' class='form-control card-number' size='20' type='text'>
              </div>
            </div>
             <div class='form-row'>
              <div class='col-xs-12 form-group card required'>
                <label class='control-label'>Email Address</label>
                <input name="email" autocomplete='off' class='form-control' size='20' type='text'>
              </div>
            </div>
            <div class='form-row'>
              
                <input name="bot" size="20" type="checkbox" style="margin-left: 30px;padding-left: 20px;">
                <label  class='control-label'>Are you a bot?</label>
              
            </div>
            <div class='form-row'>
              <div class='col-md-12 form-group'>
                         <hr class="featurette-divider"></hr>
                
                <button name="dosubmit" class='form-control btn btn-primary submit-button' type='submit'> Submit »</button>
                
              </div>
            </div>
          </div>
            
          </form>
        </div>
        
        <div class='col-md-4'></div>
    </div>
</div>
</div>
<br>
<div class="panel panel-danger"></div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
        
  </body>
    
</html>

