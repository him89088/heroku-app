function redirectToInfo(){$.ajax({url:"/information",type:'POST',cache:!1,async:!1,headers:{'cache-control':'no-cache',"Access-Control-Allow-Origin":"*"},success:function(response){var dbData=response.result;console.log("Success"+dbData)},error:function(error){console.log(error)}})}