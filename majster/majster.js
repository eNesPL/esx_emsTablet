$(function() {

    let url = 'https://tablet_policyjny/';
    let status = false;
    function display(status) {
        if (status) {
            $("#tablet_policyjny").css("display", "block")
        }
        else{
            $('#tablet_policyjny').animate({
                opacity: 'hide', // animate slideUp

                  // slide left
              }, 'fast', 'linear', function() {
                $("#tablet_policyjny").css("display", "none")

              });
              $("#wezwania").html('');
        }
    }
    $('#mandatPredefiniowany').on('hidden.bs.modal', function () {
        $("#fine-list").hide();
        $("#fine-list").html('');

    });
    window.addEventListener('message', function(event) {
        var item = event.data;
        if(item.status == 'showDisplay'){
            display(true)
        }
        else if(item.status == 'hideDisplay'){
            display(false)
        }
        if(item.action == 'otworzPanelpostaci'){
            
            $("#panel_postaci").show();
            $("#tablet_content").hide();
            $("#imie").text(item.imie + " " + item.nazwisko)
            $("#notatka_imie").text(item.imie);
            $("#notatka_nazwisko").text(item.nazwisko);
            if(item.poszukiwany == 0){
                $("#poszukiwany").text("Brak danych");
            }
            else{
                $("#poszukiwany").text("Tak");
            }
            if(item.dowod == 0){
                $("#dowod").text("Brak danych");
            }
            else{
                $("#dowod").text("Posiada");
            }

        }
        if(item.action == 'dodajNotatke'){
            $("#notatki").append('<div class="card text-white bg-secondary mb-3"><div class="card-body">'+item.notatka+'</div></div>')
        }
        if(item.action == 'dodajMandatDoListy'){
            $("#fine-list").show();
            $("#fine-list").append('<span class="fine" onclick="wystawMandat(\''+item.label+'\', \''+item.amount+'\');">'+item.label+' <span style="float:right; color:green;">$'+item.amount+'</span></span>')
        }
        if(item.action == 'dodajWezwanie'){
            if(item.open == 1) {
                var style = 'style="background-color:#f44336;"';
            }
            else{
                var style = '';
            }
            $("#wezwania").append('<tr id="wezwanie-'+item.id+'" '+style+'><td>'+item.wezwanie_wzywajacy+'</td><td>'+item.wezwanie_wiadomosc+'</td><td><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Akcja</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item" href="#" onclick="oznaczGPS(\''+item.x+'\', \''+item.y+'\', \''+item.z+'\');">Oznacz na GPS</a><a class="dropdown-item" href="#" onclick="ZakonczWezwanie(\''+item.id+'\');">Zakończ wezwanie</a></div></div></td></tr>');
        }

    });

    document.onkeyup = data => {
        if (data.key === "Escape") {
        
             $('#tablet_policyjny').animate({
                opacity: 'hide', // animate slideUp
                  // slide left
              }, 'fast', 'linear', function() {
                return $.post(`${url}exit`, JSON.stringify({}));

              });
          


          
        }
    };
    $('#wyszukaj_button').click(e => {
        $("#notatki").html('');
       var imie_nazwisko = $("#imienazwisko").val();
       return $.post(`${url}zaladujObywatela`,JSON.stringify({imie_nazwisko : imie_nazwisko }));
    })
    $('#powrot').click(e => {
        $("#panel_postaci").hide();
       $("#tablet_content").show();
 
     })
     $('#mandatPredefiniowanyButton').click(e => {
       $("#fine-categories").show();
    
     })
     
     $('#zapisznotatke').click(e => {
        var notatka = $("#notatka-textarea").val();
        $("#notatki").append('<div class="card text-white bg-secondary mb-3"><div class="card-body">'+notatka+'</div></div>')
        $('.modal').modal('hide');
        var imie = $("#notatka_imie").text();
        var nazwisko = $("#notatka_nazwisko").text();
        $("#notatka-textarea").val('');
        return $.post(`${url}zapiszNotatke`,JSON.stringify({notatka : notatka, imie: imie, nazwisko: nazwisko }));
       
       // return $.post(`${url}zaladujObywatela`,JSON.stringify({imie_nazwisko : imie_nazwisko }));
     })
  

});

function ZakonczWezwanie(id){
    $("#wezwanie-"+id).css("background-color", "#f44336")
    return $.post(`https://esx_emsTablet/zakonczWezwanie`, JSON.stringify({id : id }));
}
function oznaczGPS(x, y, z){
    return $.post(`https://esx_emsTablet/oznaczGPS`, JSON.stringify({x: x, y: y, z: z}));

}