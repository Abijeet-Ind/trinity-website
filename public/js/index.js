if (window.innerWidth === 800) {
    const n_menu = document.querySelector('.ham-menu');
    const hidden_part = document.querySelector('.hidden-part');

    n_menu.addEventListener('click', function () {
        hidden_part.classList.toggle('isHidden')
    });
}

// (max-width: 991.98px)
// .content {
//     width: 100%;
//     margin-left: 0;
// }



if (window.location.pathname === '/login') {
    $(document).ready(function () {
        $("#btn-signUp").click(function () {
            $("#loginDiv").fadeOut(700);
            $("#signUpDiv").fadeIn();
        });
        $("#toLogin").click(function () {
            $("#signUpDiv").fadeOut(700);
            $("#loginDiv").fadeIn();
        });
    });

    // extracting login and signin information
    const button = document.querySelectorAll('.btn-success');
    button.forEach(el => {
        el.addEventListener('click', async (e) => {
            // console.log(el);
            // let sendToDb;

            if (el.innerHTML === 'Sign Up') {
                const email = document.querySelector('.signup-email').value;
                const password = document.querySelector('.signup-password').value;
                const name = document.querySelector('.signup-name').value;


                let sendToDb = await axios({
                    method: 'POST',
                    url: '/api/v1/user/signup',
                    data: {
                        email,
                        password,
                        name
                    }
                })
                if (sendToDb.data.status === "success") {
                    location.assign('/');
                } else {
                    alert('ALREADY RESGISTERED');
                }

            } else if (el.innerHTML === 'Login') {
                const email = document.querySelector('.login-email').value;
                const password = document.querySelector('.login-password').value;

                sendToDb = await axios({
                    method: 'POST',
                    url: '/api/v1/user/login',
                    data: {
                        email,
                        password
                    }
                })
                if (sendToDb.data.status === "success") {
                    location.assign('/');
                } else {
                    alert('WRONG PASSWORD OR EMAIL');
                }
            }

            // console.log('send', sendToDb);
        })
    })
}

$('#search-button')[0].addEventListener('click', el => {
    if ($('#search')[0].value === '') {
        alert('please Enter anything');
    } else {
        window.location.assign(`/searched/${$('#search')[0].value.replaceAll(' ', '-')}`);
    }
})

// const account = document.querySelector('.display-logout-btn');
// if ($('.Logout')) {

//     const logout = document.querySelector('.Logout');

//     account.addEventListener('click', () => {
//         logout.classList.toggle('active');
//     })

//     $('.Logout').addEventListener('click', async (el) => {
//         const logout = await axios({
//             method: 'GET',
//             url: '/api/v1/user/logout',
//         })

//         console.log(logout);
//     }).catch(err => {
//         console.log('err')
//     })
// }


// will be modified
if ($('#place-the-order')[0]) {
    $('#place-the-order')[0].addEventListener('click', async el => {
        const email = $('#order-email')[0].value;
        const number = $('#order-number')[0].value;
        const name = $('#order-username')[0].value;
        const area = $('#order-area')[0].value;
        const address = $('#order-address')[0].value;
        const city = $('#select')[0].value;
        const productId = sessionStorage.getItem('productId');
        const size = sessionStorage.getItem('tshirt_size')
        const color = sessionStorage.getItem('tshirt_color')
        const qnt = sessionStorage.getItem('tshirt_qty')

        const sendData = await axios({
            method: 'POST',
            url: '/api/v1/product/orderrecord',
            data: {
                email,
                number,
                name,
                area,
                address,
                city,
                productId,
                size,
                qnt,
                color
            }
        })
        console.log(sendData)

        if(sendData.data.status != "success"){
            alert('please fill the information carefully')
        }else {
            alert('your order is on the way')
        }
    })
}


if (window.location.pathname.split("/")[1] === "product" && window.location.pathname.split("/")[2] === "order") {
    
    // function to change color and remove the previous color 
    const choose_size = document.querySelectorAll('.size');
    
    buttonColor = (onlyClick, className) => {
        onlyClick.forEach(el => {
            el.addEventListener('click', e => {
                onlyClick.forEach(ele => {
                    if (ele.classList.contains(className)) {
                        ele.classList.remove(className)
                    }
                })
                return el.classList.toggle(className);
            })
        })
    }
    
    buttonColor(choose_size, 'changeColor');
    $('#item-img')[0].src = sessionStorage.getItem('designedFrontView')

    if ($("#directDesignPlaceOrder")) {
        $("#directDesignPlaceOrder")[0].addEventListener('click', async el => {
            const email = $('#order-email')[0].value;
            const number = $('#order-number')[0].value;
            const name = $('#order-username')[0].value;
            const area = $('#order-area')[0].value;
            const address = $('#order-address')[0].value;
            const city = $('#select')[0].value;
            const size = $(".changeColor")[0].innerText;
            const front = sessionStorage.getItem('designedFrontView');
            const back = sessionStorage.getItem('designedBackView');
            const sticker = sessionStorage.getItem('image');
            const material = sessionStorage.getItem('material');

            let data = {
                email: email,
                number: number,
                name: name,
                area: area,
                address: address,
                city: city,
                size: size,
                front: front,
                back: back,
                material: material
            }
            if (sticker != null) {
                data.sticker = sticker;
            }

            const sendData = await axios({
                method: 'POST',
                url: '/api/v1/product/directorderrecord',
                data
            })

            if (sendData.data.status === "success") {
                alert('your order is on the way');
                sessionStorage.clear();
                window.location.assign('/');
            } else {
                alert('please fill the information carefully')
            }
        })
    }
}

if (window.innerWidth >= 700) {
    $("#mobile-only").css("display", "none");
}