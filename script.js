$(document).ready(function() {
    // กำหนดตัวแปร
    const $body = $('body')
    const $list = $('.m-info')
    const $message = $('.m-message')
    const $modal = $('.modal')
    const $loader = $('.loader')
    let $framework;

    $('.boxes a').on('click', function(e) { // แท็ก a ในคลาส boxes เมื่อคลิกแล้วใช้งานฟังก์ชัน
        e.preventDefault() //ป้องกันการกดแล้วเด้งไปหน้าอื่นที่เราไม่ได้กำหนด

        $framework = $(this).text() //รับข้อมูลข้อความไว้ในตัวแปร

        $.ajax({

            url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/Demo.json', // url API
            dataType: 'json', // ชนิดข้อมูล
            beforeSend: function() { //ก่อนส่งข้อมูลให้ใช้งานฟังก์ชั่น show
                $loader.show()
            }

        }).done(successFunction) //ถ้าผ่านให้ใช้ฟังก์ชั่น successFunction
        .fail(failFunction) // ถ้าไม่ผ่านให้ใช้ failFunction
        .always(alwaysFunction)
    })

    // success function

    function successFunction(data) {
        // console.log(data.length)
        if (data.length > 0) { //ถ้าจำนวน Data มากกว่า 0 ให้เข้าเงื่อนไข
            for (var i = 0; i < data.length; i++) { //ถ้า i น้อยกว่าจำนวนข้อมูลให้เข้าเงื่อนไข
                if($framework === data[i].name) { // เช็คว่าตัวแปร Framework ตรงกับชื่อข้อมูลใน Data มั้ย ถ้าตรงให้เข้าเงื่อนไข
                    $list.show()
                    $message.hide()

                    $list.find('li:nth-of-type(2)').text($framework)
                    $list.find('li:nth-of-type(4)').text(data[i].currentVersion)
                    $list.find('li:nth-of-type(6)').text(data[i].numberOfStars)
                    $list.find('li:nth-of-type(8)').html('<a href="' + data[i.url] + '">' + data[i.url] + '</a>')
                    
                    break //หยุดการทำงาน ถ้าเจอ Data ที่ตรงกันแล้ว
                
                } else { // ถ้าชื่อไม่ตรง Data ให้เข้าเงื่อนไข
                    $list.hide()
                    $message.show().text('No Data this Framework')
                }
            }
        } else { // ถ้าไม่เข้าเงื่อนไข
            $list.hide()
            $message.show().text('No Data this Framework')
        }
    }

    // failFunction
    function failFunction(request, textStatus, errorThrown) {
        $list.hide()
        $message.text('An error request: ' + request.status + ' ' + textStatus + ' ' + errorThrown)
    }

    //always function
    function alwaysFunction() {
        $loader.hide()
        $modal.addClass('active')
        $body.css('overflow', 'hidden')
    }

    $modal.find('button').on('click', function() { //จับแท็ก button เมื่อคลิกให้ใช้งานฟังก์ชั่น
        $body.css('overflow', 'visible') // tag body Add CSS overflow: visible;
        $(this).parent().removeClass('active')
    })
})