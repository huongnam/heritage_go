function showHidePassword() {
    var x = document.getElementById("userPW");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
