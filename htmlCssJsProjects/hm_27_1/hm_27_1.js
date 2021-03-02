$(function(){
//append to nav all menu items from json file
    $("body").on("click", "#myManu", function (e) {
        $('.collapse').remove();
        let output = `
        <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
        `;
        e.preventDefault();
        $.getJSON( "navbar.json", function(data) {
            console.log(data)
            $.each(data, (index, user) => {
                console.log(user)
                console.log(index)
                console.log(user.color)
                output += `
                <li class="nav-item active">
                <span class="tooltiptext">${user.tooltip}</span>
                <a class="nav-link" id="" onClick="loadPage('${user.htmlName}')" href="#">${user.htmlName}<span class="sr-only">(current)</span></a>
                </li>
                `;
            });
            $('nav').append(output + '</ul></div>');
        });
    });
    
});
//edit index html page by selected item from menu
function loadPage(htmlName){
    $(function(){
        $('title').text('');
        $('h1').remove();
        let inHtml = '';
        $.getJSON( "navbar.json", function(data) {
            $.each(data, (index, user) => {
                if (htmlName==user.htmlName){
                    $('body').css('background', `${user.color}`);
                    $('title').text(`${user.htmlName}`);
                    inHtml += `<h1 style="margin: 100px;">${user.title}</h1>`
                    $('body').append(inHtml);
                }
            });
        });
    });
}
