// Shorthand for $( document ).ready()
$(function () {
    var toMailForm = $('#toMailForm');
    var submitButton = $('#submitButton');
    var divstaffname = $('#divstaffname');
    var divLoadingSpinner = $('#divLoadingSpinner')
    var divSucessAlert = $('#divSucessAlert')

    divLoadingSpinner.hide();
    divstaffname.hide();

    $('#toMailForm input').on('change', function () {
        var organizedBy = $('input[name=organizedby]:checked', '#toMailForm').val();
        if (organizedBy === "Department") {
            divstaffname.hide();
        } else {
            divstaffname.show();
        }
    });

    //On submit
    toMailForm.on('submit', function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        divLoadingSpinner.show();
        submitButton.attr("disabled", true);
        var data = new FormData(this);
        //data.append('messageData', $("#toMailForm :input"));
        // var filesList = document.getElementById('uploadeddocuments'); //get all files attached
        // for (var i = 0; i < filesList.files.length; i++) {
        //     data.append('file', filesList.files[i]);
        // }
        console.log(data)
        $.ajax({
            type: 'POST',
            url: toMailForm.attr('action'),
            enctype: 'multipart/form-data',
            //contentType: 'multipart/form-data',
            data: data,
            processData: false, //important
            contentType: false
        }).done(function (i) {
            afterFormSubmitted();
            divSucessAlert.attr("hidden",false);
        }).catch(function (e) {
            afterFormSubmitted();
            alert("There was an error");
        });
        //console log formdata as JSON
        // $('#toMailForm').on('submit', function (e) { //use on if jQuery 1.7+
        //     //e.preventDefault();  //prevent form from submitting
        //     var data = $("#toMailForm :input").serialize();
        //     //var JSONdata = JSON.stringify(data)
        //     console.log(data); //use the console for debugging, F12 in Chrome, not alerts        
        // });
    });

    function afterFormSubmitted() {
        //this function is called whether the form submission fails or passes
        submitButton.attr("disabled", false);
        divLoadingSpinner.hide();
    };
});