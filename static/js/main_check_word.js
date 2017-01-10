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
       
        if(checkbox[i].checked==true){
            bool_check_obj[checkbox[i].value] = 1;
            graphic_data.push(+checkbox[i].value);
        } else{
            bool_check_obj[checkbox[i].value] = 0;
            graphic_data.push(+checkbox[i].value);
        }
    };
    //console.log(bool_check_obj,graphic_data)

    var percent_graphic_data = [[0,1]];
    var point_x_array = [];
    var size_of_sample = 0;
    var sum = 0;
    for(i in bool_check_obj){
        size_of_sample+=1;
        sum += bool_check_obj[i];
        //console.log(bool_check_obj[i])
        if(size_of_sample==10){
            
            percent_graphic_data.push([+i,sum/10]);
            point_x_array.push(+i);
            size_of_sample=0;
            sum=0;

        }        
    }
    F_procent_graphic = [];
    for (var i = 1; i < point_x_array.length; i++) {
        //SumSeries(i);
        F_procent_graphic.push([point_x_array[i], SumSeries(i,point_x_array.length,point_x_array,percent_graphic_data)]);
        //console.log(point_x_array[i])
    };
    console.log(F_procent_graphic,point_x_array)
    
    Highcharts.chart('graphic', {
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            
            title: {
                text: 'word'
            }
        },
        yAxis: {
            title: {
                text: '%'
            },
            min: 0
        },
        

        series: [{
            name: 'word',
            data: percent_graphic_data
        }]
    });
    Highcharts.chart('graphic_F', {
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            
            title: {
                text: 'word'
            }
        },
        yAxis: {
            title: {
                text: '%'
            }
        },
        

        series: [{
            name: 'word',
            data: F_procent_graphic
        }]
    });

});
function SumSeries(n_point,N,point_x_array,percent_graphic_data){
    var sum = 0;
    for (var i = n_point; i < N; i++) {
        //sum += point_x_array[i]*(percent_graphic_data[i-1][1]-percent_graphic_data[i][1])
        //console.log(i,point_x_array[i],percent_graphic_data[i-1][1],percent_graphic_data[i][1])
        sum += percent_graphic_data[i][1]*(point_x_array[i]-point_x_array[i-1]);
        console.log(sum)
    };
    return sum;
}