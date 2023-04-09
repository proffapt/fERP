// Executed when the submit button is clicked


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<script language='JavaScript' type='text/javascript' src='./build/common.js'></script>
<script>
    function retreiveData(showLocation, page, params) {
        document.getElementById('appDiv1').style.dislay = 'none';
        showLocation.innerHTML = "<font color='maroon'>Please wait...</font>";

        var xmlHttp = null;
        try {  // Firefox, Opera 8.0+, Safari
            xmlHttp = new XMLHttpRequest();
        } catch (e) { // Internet Explorer
            try {
                xmlHttp = null
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlHttp = null;
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    alert("Your browser does not support AJAX!");
                    return false;
                }
            }
        }

        xmlHttp.open("POST", page, false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.setRequestHeader("Content-length", params.length);
        xmlHttp.setRequestHeader("Connection", "close");
        xmlHttp.send(params);
        if (xmlHttp.readyState == 4)
        {
            if (xmlHttp.status == 200) {
                showLocation.innerHTML = xmlHttp.responseText;
                showLocation.style.display = '';
                if (typeof parent.setFrameWH != 'undefined' && parent.setFrameWH != null)
                    parent.setFrameWH();
            } else if (xmlHttp.status == 500) {
                alert('Sorry for Inconvenience');
            }
        }

    }
    /*
     function getsub() {
     var r = document.getElementsByTagName("input");
     var flg=false;
     var p_r=null;
     var alr="N";
     var alr1="N";
     for (var i=0; i < r.length; i++) {       
     if ((r[i].type == "radio")) {
     // flg=false;
     if(p_r!=r[i].name){      
     var radios = document.getElementsByName(r[i].name);
     flg=false;       
     // flg='';
     for (var j = 0; j<radios.length; j++) {
     if (radios[j].checked==true) {
     flg = true;
     continue;
     }
     }
     
     p_r=r[i].name; 
     if(flg == false) {
		 alr=(r[i].name).substring((r[i].name).indexOf('_', 5)+1,r[i].name.length);
		 break;
     }
     
     }
     }
     }
     
     var flg1="";
     var r1 = document.getElementsByTagName("textarea");
     for (var l=0; l < r1.length; l++) {
     flg1="";
     
     if (r1[l].value.replace(/(\s+)+/g,'')!='') {
		 flg1 = 'Y';
     } else{
		 //alert(r1.length)
		 // alert(r1[l].name);
		 alr1=(r1[l].name).substring(6,(r1[l].name).length);
		 // alert(alr1);
		 break;
     }
     }
     
     
     if(flg != true ) {
		 alert("Please  answer  question  "+alr);
		 return false;
     } else if(flg1=='')
     alert("Please  answers  question  "+alr1);
     return false;
     }
     else if(document.getElementById('passline') .value==''){
     alert("Please enter the captcha code.");
     return false;
     }
     else{
     var r=confirm("Please check the answers properly, once submitted , no further change is allowed")
     if (r==true) {
     document.form1.method="POST";
     document.form1.action="first_yr_feed_submit.jsp";
     document.form1.submit();
     }
     }
     */
    function trim(str) {
        if (!str || typeof str != 'string')
            return null;

        return str.replace(/^[\s]+/, '').replace(/[\s]+$/, '').replace(/[\s]{2,}/, ' ');
    }
    function hasWhiteSpace(s) {
        reWhiteSpace = new RegExp("/^\s+$/");
        // Check for white space
        if (reWhiteSpace.test(s)) {
            //alert("Please Check Your Fields For Spaces");
            return false;
        }
        return true;
    }
    function getsub1() {
        document.form1.method = "POST";
        document.form1.action = "first_yr_feedback_subwise.jsp";
        document.form1.submit();
    }
    function limitText(limitField, limitCount, limitNum) {
        if (limitField.value.length > limitNum) {
            limitField.value = limitField.value.substring(0, limitNum);
        } else {
            limitCount.value = limitNum - limitField.value.length;
        }
    }

    function getsub() {
        var r = document.getElementsByTagName("input");
        var flg = false;
        var p_r = null;
        var alr = "N";
        var alr1 = "N";
        for (var i = 0; i < r.length; i++) {
            if ((r[i].type == "radio")) {
                // flg=false;
                if (p_r != r[i].name) {
                    var radios = document.getElementsByName(r[i].name);
                    flg = false;
                    // flg='';
                    for (var j = 0; j < radios.length; j++) {
                        if (radios[j].checked == true) {
                            flg = true;
                            continue;
                        }
                    }

                    p_r = r[i].name;
                    if (flg == false) {
                        alr = (r[i].name).substring((r[i].name).indexOf('_', 5) + 1, r[i].name.length);
                        break;
                    }
                }
            }
        }

        var flg1 = "";
        var r1 = document.getElementsByTagName("textarea");
        for (var l = 0; l < r1.length; l++) {
            flg1 = "";
            if (r1[l].value.replace(/(\s+)+/g, '') != '') {
                flg1 = 'Y';
            } else {
                //alert(r1.length)
                // alert(r1[l].name);
                alr1 = (r1[l].name).substring(6, (r1[l].name).length);
                // alert(alr1);
                break;
            }
        }

        if (flg != true) {
            alert("Please  answer  question  " + alr);
            return false;
        } else if (flg1 == '') {
            alert("Please  answers  question  " + alr1);
            return false;
        } else if (document.getElementById("passline").value == '') {
            alert("Please  Provide the Captcha");
            return false;
        } else {
            /*document.form1.method="POST";
             document.form1.action="rev_feed_submit.jsp";
             document.form1.submit();  */

            var xmlHttp;
            try {  // Firefox, Opera 8.0+, Safari
                xmlHttp = new XMLHttpRequest();
            } catch (e) {  // Internet Explorer
                try {
                    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        alert("Your browser does not support AJAX!");
                        return false;
                    }
                }
            }
            xmlHttp.open("GET", "rev_validatecaptcha.jsp?passline=" + document.getElementById('passline').value, false);
            xmlHttp.send(null);
            if (xmlHttp.status == 200) {
                var returnStr = xmlHttp.responseText.match("valid");

                if (returnStr == "valid") {
                } else {
                    alert("The Captcha Code Is Incorrect ");
                    return false;
                }
            }

            var r = confirm("Please check the answers properly, once submitted , no further change is allowed")
            r = true;
            if (r == true) {
                var r1 = document.getElementsByTagName("textarea");
                
                for (var l = 0; l < r1.length; l++) {

                   // alert(r1[l].name);
                    var u_val = r1[l].value;
                   // u_val = encodeURI(encodeURI(u_val));
                  //  u_val = encodeURIComponent(encodeURIComponent(u_val));// this is blocked on 1-03-2021
                     u_val = utoa(u_val);
                    //u_val = encodeURI(u_val);
                  //  alert(u_val);
                    document.getElementById(r1[l].name).value=u_val;
                }

                 document.form1.method = "POST";
                 document.form1.action = "rev_feed_submit.jsp";
                 document.form1.submit();
            }
        }
    }

function utoa(data) {
	return btoa(unescape(encodeURIComponent(data)));
}

</script>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <title>JSP Page</title>
        <link rel="StyleSheet" href="../css/style1.css">
    </head>
    <body onload="retreiveData(document.getElementById('appDiv'),'rev_feed_Form_fac.jsp','sub=EP21201&sub_type=TH&acad_session=2022-2023&semester=SPRING&assignee_id=16007&subject_status=null&message=The Captcha Code Is Incorrect ')">
        <form name="form1" action="" method="post">
            

            <table align="center"><tr bgcolor="white"><td colspan="6" align="center"><font color="green"><b>List Of Subjects<br>(Please click on the subject number to enter the feedback)</b></font></td></tr><tr bgcolor="white">
                    <td bgcolor="pink"><a href="javascript:void(0)" title="WORK SYSTEM DESIGN LABORATORY"  onclick="retreiveData(document.getElementById('appDiv'), 'rev_feed_Form_fac.jsp', 'sub=IM29202&sub_type=L&acad_session=2022-2023&semester=SPRING&subject_status=Normal')">IM29202</a></td>

                    
                    <td bgcolor="pink"><a href="javascript:void(0)" title="INTRODUCTION TO INNOVATION AND ENTREPRENEURSHIP"  onclick="retreiveData(document.getElementById('appDiv'), 'rev_feed_Form_fac.jsp', 'sub=EP21201&sub_type=TH&acad_session=2022-2023&semester=SPRING&subject_status=Normal')">EP21201</a></td>

                    
                    <td bgcolor=""><a href="javascript:void(0)" title="OPERATIONS RESEARCH II"  onclick="retreiveData(document.getElementById('appDiv'), 'rev_feed_Form_fac.jsp', 'sub=IM21204&sub_type=TH&acad_session=2022-2023&semester=SPRING&subject_status=Normal')">IM21204</a></td>

                    
                    <td bgcolor=""><a href="javascript:void(0)" title="TRANSFORM CALCULUS"  onclick="retreiveData(document.getElementById('appDiv'), 'rev_feed_Form_fac.jsp', 'sub=MA20202&sub_type=TH&acad_session=2022-2023&semester=SPRING&subject_status=Normal')">MA20202</a></td>

                    
                    <td bgcolor=""><a href="javascript:void(0)" title="WORK SYSTEM DESIGN"  onclick="retreiveData(document.getElementById('appDiv'), 'rev_feed_Form_fac.jsp', 'sub=IM20202&sub_type=TH&acad_session=2022-2023&semester=SPRING&subject_status=Normal')">IM20202</a></td>

                    
                    <td bgcolor=""><a href="javascript:void(0)" title="OPERATIONS RESEARCH LABORATORY"  onclick="retreiveData(document.getElementById('appDiv'), 'rev_feed_Form_fac.jsp', 'sub=IM29204&sub_type=L&acad_session=2022-2023&semester=SPRING&subject_status=Normal')">IM29204</a></td>

                    
                    <td bgcolor=""><a href="javascript:void(0)" title="MANAGEMENT OF INVENTORY SYSTEMS"  onclick="retreiveData(document.getElementById('appDiv'), 'rev_feed_Form_fac.jsp', 'sub=IM21202&sub_type=TH&acad_session=2022-2023&semester=SPRING&subject_status=Normal')">IM21202</a></td>

                    
                </tr> </table>
            <div id="appDiv1">
                <table><tr><td>
                            <font color="red"><b>Please Note:- Students have to give feedback( in Theory And Laboratory Subjects) for all the teachers of class/section, failing which, the feedback shall be incomplete and students will not be able to get their admit cards</b></font></td></tr>
                    <br><tr><td><font color="#000099"><b>Course evaluations give you the opportunity to express views about a course and the way it was
                                    taught. Since the objective of this exercise is to strengthen the teaching-learning process, it is
                                    important that you answer thoroughly and honestly. Please be detailed in your answers and give
                                    examples where possible, answering all questions.</b></font></td></tr>
                    <tr><td><font color="red"><b>PLEASE ANSWER ALL QUESTIONS</b></font></td></tr></table>
            </div>
            <div id="appDiv">

            </div>
        </form>
    </body>
</html>
