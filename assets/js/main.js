let plans = [
    { plan: 'Basic', price: 125 },
    { plan: 'Plus', price: 195},
    { plan: 'Premium', price: 425}
]
let clients = 0;
let multiplier = 0;

const Url = 'https://hook.integromat.com/ipj8a7lpcjaf3kscolewtbmrm7q9xp4g'


function PlanAverage(){
    let sum = plans.reduce((currentTotal, plan) => {
        return plan.price + currentTotal
    }, 0)
    return sum / plans.length
}

function Gross() {
    let gross_income = (multiplier * PlanAverage()) * clients;
    return gross_income;
}

function BasePlan() {
    return PlanAverage() * clients
}

function NetIncome() {
    return Gross() - BasePlan()
}

function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

  function ValidateEmail(mail) {
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(mailformat.test(mail)){
        return(true)
    }
    else {
        return(false)
    }
}

function getInput(){
    clients = document.getElementById("clients").value;
    multiplier = document.getElementById("markup").value;

    $(".popup_container").addClass("active");
    $(".popup_email").addClass("active");    
}

$("#compute").on("click", function() {
    getInput();
})

$("#close_compute").on("click", function() {
    $(".popup_email").removeClass("active");
    $(".popup_container").removeClass("active");
    $(".notif").removeClass("active");
});

$("#estimate").on("click", function() {
    let email_holder = document.getElementById("email").value
    let name_holder = document.getElementById("fullname").value
    if (email_holder != "") {
        if (ValidateEmail(email_holder)){
            $(".notif").removeClass("active");
            
            //make the request here!
            const data = { email: email_holder, name: name_holder }
            $.post(Url, data, function(status) {
                
            })
            // document.getElementById("grossincome").innerHTML = currencyFormat(Gross());
            // document.getElementById("baseplan").innerHTML = currencyFormat(BasePlan());
            document.getElementById("estimatedincome").innerHTML = currencyFormat(NetIncome());

            $(".popup_calculator").addClass("active");
            $(".popup_email").removeClass("active");
        }
        else {
            document.getElementById("msg").innerHTML = "Invalid email address"
            $(".notif").addClass("active");
        }
    }
    else {
        document.getElementById("msg").innerHTML = "Email address cannot be empty"
    $(".notif").addClass("active");
    }
})

$("#close_calculator").on("click", function() {
    $(".popup_calculator").removeClass("active");
    $(".popup_container").removeClass("active");
});