// let result =fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=S1JDX8XYIQ5XTODX")
// .then(response => response.json())
// .then(json => 
//   console.log(json),
//   document.getElementById('symbol-list').append ('<h4>'+json['Meta Data']['2. Symbol']),
//   );

  // const userAction = async () => {
  //   const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=S1JDX8XYIQ5XTODX');
  //   const myJson = await response.json(); //extract JSON from the http response
  //   console.log(myJson);
  // }

var mycall = 1;

// Defining async function
async function getapi( timeFrame, symBol ) {

  const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_'+timeFrame+'&symbol='+symBol+'&interval=5min&apikey=S1JDX8XYIQ5XTODX';

  const response = await fetch(url);
  var latestPrice = 0;
  if( timeFrame == 'WEEKLY' ) {
    dataKey = 'Weekly Time Series';
  } else if ( timeFrame == 'MONTHLY' ) {
    dataKey = 'Monthly Time Series';
  } else {
    dataKey = 'Time Series (5min)';
  }

  var data = await response.json();
  console.log( data);
  var myData= data[dataKey];
  for(key in myData) {
    if (myData.hasOwnProperty(key)) {
      latestPrice = myData[key]['4. close'];
      break;
    }
  }

  let myHtml = `<div onclick='myToggle(`+mycall+`)' id=`+mycall+`><h4>`+data['Meta Data']['2. Symbol']+`<span> `+latestPrice+`</span><button>`+timeFrame+`
            </button> <i onclick='remove(`+mycall+`)' class="fa-sharp fa-solid fa-circle-xmark"></i></h4>`;

            let myList = `<div id='list`+mycall+`'style='display:none'><table>
            <thead>
              <tr>
                <th>Date Time</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>`
            for(key in myData) {
              if (myData.hasOwnProperty(key)) {
                myList = myList+ `<tr>
                        <td>`+key+`</td>
                        <td>`+myData[key]['1. open']+`</td>
                        <td>`+myData[key]['2. high']+`</td>
                        <td>`+myData[key]['3. low']+`</td>
                        <td>`+myData[key]['4. close']+`</td>
                        <td>`+myData[key]['5. volume']+`</td>
                </tr>`
                  
              }
            }
            myList = myList+` </tbody>
          </table></div>`

  $('#symbol-list').append(myHtml+myList);
  console.log(myList);
  mycall++;

}

  
function Click(evt, time) {
  
    document.getElementById("INTRADAY").style.backgroundColor="gray";
    document.getElementById("DAILY").style.backgroundColor="gray";
    document.getElementById("WEEKLY").style.backgroundColor="gray";
    document.getElementById("MONTHLY").style.backgroundColor="gray";
    document.getElementById(time).style.backgroundColor="red";
    $('#time_series').val(time);
    timeFrame = time;
  }

  function search() {
    timeFrame = $('#time_series').val();
    symBol = $('#search').val();
    getapi(timeFrame,symBol); 
  }

  function remove( id ){
    $('#'+id).remove();
  }
  function myToggle(id){
    $('#list'+id).toggle();
  }