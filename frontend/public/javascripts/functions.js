$(document).ready( function () {
    try {
        var table1 = $('#example').DataTable( {
            pageLength : 18,
            "lengthChange": false,
            info: false
          } )
          document.getElementById("example").style.display = "block"
        }
    catch (e){}    
    

    var table2 = $('#apareceEm').DataTable( {
        pageLength : 6,
        "lengthChange": false,
        info: false
    } )

    var table3 = $('#example_user').DataTable( {
        pageLength : 3,
        "lengthChange": false,
        info: false
    } )

    var table4= $('#example2_user').DataTable( {
        pageLength : 2,
        "lengthChange": false,
        info: false
    } )
} );