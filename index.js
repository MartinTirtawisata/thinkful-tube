const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
    const query = {
        part: 'snippet',
        key: "AIzaSyB3fvu0pgj_WfrWozSqoP53d4qiU4jwi4A",
        q: `${searchTerm} in:name`,
    }
    $.getJSON(YOUTUBE_SEARCH_URL,query,callback);
}

function renderResult(item){
    return `<div class="col-3">
    <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank"><img src="${item.snippet.thumbnails.default.url}"></a>
    <p> ${item.snippet.title}</p>
    </div>`;
}

function searchResult(data){
    console.log(data)
    const results = data.items.map((item,index) => renderResult(item));
    $('.js-search-result').html(results);
}

function searchSubmit(){
    $('.js-search-form').submit(function(event){
        console.log('searchResult ran')
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-input-query')
        const queryVal = queryTarget.val();
        console.log(queryVal)
        queryTarget.val("");
        getDataFromApi(queryVal, searchResult)
        
    });
}


$(searchSubmit);