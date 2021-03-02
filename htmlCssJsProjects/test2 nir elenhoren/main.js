$(function(){
    $("body").on("click", "#showAllCountries", function () {
        getAllFlags();
    });
    $("body").on("click", "#searchCountries", function () {
        let searchInput = $("#searchInput").val();
        flagInfo(searchInput);
    });
});

function getAllFlags() {
    $(function(){
        jQuery.ajax({
            type: "get",
            url: 'https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag',    dataType: "json",
            success: function (data) {
                console.log(data);
                let allCountriesString = countryCardString(data);
                $("#countriesLoad").html(allCountriesString);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    });

};
function flagInfo(flageName){
    $(function(){
        jQuery.ajax({
            type: "get",
            url: 'https://restcountries.eu/rest/v2/name/' + flageName,
            dataType: "json",
            success: function (data) {
                console.log(data)
                let searchCountriesString = countryCardString(data);
                $("#countriesLoad").html(searchCountriesString);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('No such country, try again');
            }
        });
    });
};
function countryCardString(data){
    let infoHtml = '';
    for(let i=0;i<data.length;i++){
        infoHtml += `
        <div class="col-sm-4 col-12">
        <div class="card border-success mb-3" style="max-width: 20rem;">
            <div class="card-header">
                ${data[i].name}
            </div>
            <div class="card-body">
                <div class="card-title">
                    <img class="img-fluid" src=${data[i].flag} alt="Oops">
                </div>
                <div class="row">
                    <div class="col-12 cardInf">
                        <p class="card-text cName">Name:  ${data[i].name}</p>
                        <p class="card-text cTopD">Dom:  ${data[i].topLevelDomain}</p>
                        <p class="card-text cCap">Capital City:  ${data[i].capital}</p>
                        <p class="card-text cCurr">Currencies:  ${data[i].currencies[0].code}  ${data[i].currencies[0].name}  ${data[i].currencies[0].symbol}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    };
    return infoHtml;
};
