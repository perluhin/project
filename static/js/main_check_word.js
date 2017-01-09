var global_dict_word;
$.ajax({
    url: '/word',
    data: {},
    type: 'POST',
    success: function(response){
        console.log('Данные загрузились.',response);
        global_dict_word = response['dict_random_word'];
        for (var i = 0; i < response['word_list'].length; i++) {
            var j =i%3;
            $('.container'+j).append('<div class="box-word'+i+'"></div>');
            var info_word = response['word_list'][i];
            $('.box-word'+i).append('<input type="checkbox"  value="'+info_word[0]+'">'+info_word[1]);
        };

    },
    error: function(error){
        console.log(error);
    }
});
/*$(document).on('click', '.send-checkbox', function(){
    console.log($("input:checkbox:checked").length);
    var checkbox = $("input:checkbox:checked");
    var sum = 0;
    for (var i = 0; i < checkbox.length; i++) {
        console.log(checkbox[i].value);
        sum+= +checkbox[i].value;
    };
    $('.result-text').empty();
    $('.result-text').append(sum/checkbox.length)
    console.log(sum,sum/checkbox.length)
})*/
$(document).on('click', '.send-checkbox', function(){
    //console.log($("input:checkbox").length);
    var bool_check_obj = {};
    var checkbox = $("input:checkbox");
    var graphic_data = [];
    console.log(checkbox)
    for (var i = 0; i < checkbox.length; i++) {
        //checkbox[i].value
        //console.log(checkbox[i].checked);
        graphic_data.push([]);
        if(checkbox[i].checked==true){
            bool_check_obj[checkbox[i].value] = 1;
            graphic_data[i].push(+checkbox[i].value);
            graphic_data[i].push(1);

        }else{
            bool_check_obj[checkbox[i].value] = 0;
            graphic_data[i].push(+checkbox[i].value);
            graphic_data[i].push(0);
        }
    };
    //console.log(bool_check_obj,graphic_data)

    var percent_graphic_data = [[0,1]];
    var size_of_sample = 0;
    var sum = 0;
    for(i in bool_check_obj){
        size_of_sample+=1;
        sum += bool_check_obj[i];
        //console.log(bool_check_obj[i])
        if(size_of_sample==10){
            
            percent_graphic_data.push([+i,sum/10]);
            size_of_sample=0;
            sum=0;

        }        
    }
    console.log(percent_graphic_data)
    
    Highcharts.chart('graphic', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Snow depth at Vikjafjellet, Norway'
        },
        subtitle: {
            text: 'Irregular time data in Highcharts JS'
        },
        xAxis: {
            
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Snow depth (m)'
            },
            min: 0
        },
        

        series: [{
            name: 'word',
            data: percent_graphic_data
        }]
    });

});