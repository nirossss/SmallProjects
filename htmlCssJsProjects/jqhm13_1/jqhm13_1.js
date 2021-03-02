$(function(){
//get object from outsource json file and print options to html
    let output = '';
    $.getJSON( "jqhm13_1.json", function(data) {
        console.log(data);
        let typeArr = []
        $.each(data, (index, user) => {
            typeArr.push(user.type);
        });
        $.each(typeArr, (index, type) => {
            output += `<option data-type="${type}" value="${type}">${type}</option>`
        });
        $('.theSelectBox').append(output);
        for (i=0; i<typeArr.length;i++){
            for (x=0;x<typeArr.length;x++){
                if(typeArr[i]==typeArr[x] && i != x){
                    $("option").parents(".theSelectBox").find("option:eq("+(i+1)+")").remove();
                }
            }
        }
    });
// on click get items from json file and show them as a list on html
//depends on option value pick 
    $("body").on("click", "#submit", function (e) {
        e.preventDefault();
        let opVal = $(".theSelectBox").val();
        let itemsHtml = '<div class="row">';
        $.getJSON( "jqhm13_1.json", function(data) {
            console.log(opVal)
            $.each(data, (index, user) => {
                console.log(user)
                console.log(user.type)
                console.log(user.opVal)
                if(user.type==opVal){
                    itemsHtml += `
                        <div class="col-md-4">
                            ${index}:<br><a href="http://www.google.com/search?q=${index}+food">${user.poster}</a>
                            <ul>
                                <li>Serial Number: ${user.idNumber}</li>
                                <li>type: ${user.type}</li>
                                <li>description: ${user.description}</li>
                                <li>price: ${user.price}</li>
                            </ul>
                        </div>
                    `
                }
            });
            $('.container').append(itemsHtml + '</div>');
        });
    });
});
