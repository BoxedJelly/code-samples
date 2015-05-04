/* 
 * This is my first time working with cookies. The code I used is
 * attributed to : http://www.echoecho.com/jscookies02.htm
 * great tutorial!
 */

window.onload = function ()
{
    console.log("starting cookie: " + document.cookie);
    onload = highlightPage(currentPageName());
    if (window.location.pathname === "/250_CartoonSales_tkutzner/sc.html") {
        makeTable();
        checkCorrectShipping();
        var radios = document.infoForm.shipMethod;
        var prev = null;
        for (var i = 0; i < radios.length; i++) {
            console.log("in sc for");
            radios[i].onclick = function () {
                (prev) ? console.log(prev.value) : null;
                if (this !== prev) {
                    prev = this;
                }
                console.log(this.value);
            }
        }
    }
    if (currentPageName() === "co") {
        console.log("got in onload co if");
        primecoPage();
        fillCoTable();
    }
    if (onProductPage()) { // if we are currently on a productPage
        console.log("got in window.onload if (isProductPage())")
        document.getElementById('qtyUp').onclick = increaseQty;
        document.getElementById('qtyDown').onclick = decreaseQty;
    }
    document.getElementById('contemp').onclick = flipContemp;
    document.getElementById('classic').onclick = flipClassic;
    document.getElementById('children').onclick = flipChildren;
    console.log("all java script seems to have fully executed");
};

///////////////////////////COOKIES UTILITIES///////////////////////////////////////////
function getCookies() {
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1);
        if (c.indexOf(name) !== -1)
            return c.substring(name.length, c.length);
    }
    return ""; //the cname cookie wasn't there
} //getCookies

function getAllCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i - 1] + "\n";
    }
    return aString;
}//not used in this program...probably needs debugged

function delCookie(NameOfCookie)
{
    if (getCookie(NameOfCookie)) {
        document.cookie = NameOfCookie + "=" +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}


function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0)
            return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    return unescape(dc.substring(begin + prefix.length, end));
}


function setCounterCookie(NameOfCookie, value, expiredays)
{
    var ExpireDate = new Date();
    ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
    document.cookie = NameOfCookie + "=" + encodeURI(value) +
            ((expiredays === null) ? "" : "; expires=" + ExpireDate.toGMTString());
}
///////////////////////COOKIES CONT'D ADD TO CART BUTTON//////////////////////////
function addToCart(amt) {
    console.log("got in addToCart(amt)");
    if (getCookie(currentPageName()) === "0" || getCookie(currentPageName()) === null) {
//        if (amt < 10) {
//            document.cookie = currentPageName() + "=0" + amt;
//        }
//        else {
        document.cookie = currentPageName() + "=" + amt;
        //}
        console.log(document.cookie);
        if (amt > 0) {
            alert(amt + " " + currentPageName() + " added to cart.");
        }
        if (amt < 0) {
            alert(amt + " " + currentPageName() + " removed from cart.");
        }
    }
    else {
        console.log("got in addtocart else");
        var i = parseInt(getCookie(currentPageName()));
        console.log(i);
        var j = i + parseInt(amt);
        console.log("else amt + cookieval: " + j);
        delCookie(currentPageName);
        document.cookie = currentPageName() + "=" + j;
        if (amt > 0) {
            alert(amt + " " + currentPageName() + " added to cart." + "\nTotal " + currentPageName() + ": " + j);
        }
        if (amt < 0) {
            alert(amt + " " + currentPageName() + " removed from cart." + "\nTotal " + currentPageName() + ": " + j);
        }
    }

}

///////////////////////Check shopping cart///////////////////////////////////

function makeTable() {
    console.log("got in makeTable()");
    if (document.cookie === '' || document.cookie === null) {
        var buyTicon = "<p id=\"cartDefault\">There are no items in your cart! buy buy buy!</p>";
        document.getElementById('tableDiv').innerHTML += buyTicon;
    }
    else {
        console.log("got in makeTable else");
        var cookies = document.cookie.split(";");
        var first = true;
        document.cookie = "shipping=.03";
        var qtyCounter = 0;
        for (var i = 0; i < cookies.length; i++) {
            var name = cookies[i].substring(0, cookies[i].indexOf("=")).trim();
            console.log("name=" + name);
            if (isProductPage(name)) {
                qtyCounter++;
                var value = cookies[i].substring(cookies[i].indexOf("=") + 1);
                console.log("name + value: " + name + value);
                var what = "<table class=\"sctable\"><tr><td><b>" + name.substring(0, 2) + "-logo" + "</b></td><td><b id=\"" + name + i + "\">" + name + "</b></td>\n\
                        <td id=\"sctableTot\"><b>$2.99</b></td><td><input type=\"number\" class=\"scBox\" name =\"qtyOrdered" + qtyCounter + "\" value =\"" + value + "\" onchange=\"recalRow(" + name + ",this.name)\"></td>\n\
                        <td><input type=\"text\" class=\"scBox\" name=\"totalPricePerUnit\" value=\"" + totalPricePerUnit(value, null) + "\" disabled></td></tr></table>";
                document.getElementById('jstable').innerHTML += what;
                console.log("made product row");
            }//if
        }//for
    }
    console.log("got out of makeTable() if/else");
    var totPrice = totalPrice(false);
    var total = "<table class=\"sctable\"><tr><td></td><td colspan=\"3\" id=\"sctableTot\"><b>Total</b></td>\n\
                        <td><input class=\"scBox\" name=\"totalPriceBox\" type=\"text\" value=\"" + totPrice + "\"disabled></td></tr></table>";
    document.getElementById('jstable').innerHTML += total;
    var shipTots = totalShipping(false);
    var shipTr = "<table class=\"sctable\"><tr><td id=\"sctableTot\">Shipping</td><td colspan=\"3\"><input type=\"radio\" id=\"shipRadio1\" name=\"shipMethod\"\n\
                    value=\"Parcel Post\" onchange=\"changeShipping()\">Parcel Post<br><input type=\"radio\" id=\"shipRadio2\" onchange=\"changeShipping()\"name=\"shipMethod\" value=\"Priority\">Priority\n\
                    <br><input type=\"radio\" id=\"shipRadio3\" name=\"shipMethod\" onchange=\"changeShipping()\" value=\"2-day\">2-day</td><td id=\"shippingTotalBox\">$" + shipTots + "</tr></table>";
    document.getElementById('jstable').innerHTML += shipTr;

    var orderTot = setTotalOrder(false);
    var finalTotal = "<table class=\"sctable\"><tr><td></td><td colspan=\"3\" id=\"sctableTot\"><b>Total This Order</b></td>\n\
                         <td><input class=\"scBox\" id =\"orderTotalBox\" type=\"text\" value=\"$" + orderTot + "\"disabled></td></tr></table>";

    document.getElementById('jstable').innerHTML += finalTotal;
    document.getElementById('jstable').innerHTML += "<table class=\"sctable\"><tr><td id =\"subBut\" colspan=\"5\">\n\
        <input type=\"submit\" value=\"Submit Order\">";

}
//document.getElementById("t1").innerHTML = tableContent;

var s = "";
function debugString(string) {
    s += string + " ";
    console.log("debugString: " + s);
}
function printDebugString() {
    console.log(s);
}
/*
 * <table><tr><td><b class="rtitle">Product Code</b></td>
 <td><b class="rtitle">Description</b></td>
 <td><b class="rtitle">Price&NewLine;Each</b></td>
 <td><b class="rtitle">Qty Ordered</b></td>
 <td><b class="rtitle">Total</b></td>   
 </tr>";
 */

//////////////////////////NAVIGATION UTILITIES///////////////////////////
function flipContemp()
{
    var m = document.getElementById('subcategoryone');
    if (m.style.display === "none" || m.style.display === "")
        m.style.display = "block";
    else
        m.style.display = "none";
} //flipContemp
function flipClassic()
{
    var m = document.getElementById('subcategorytwo');
    if (m.style.display === "none" || m.style.display === "")
        m.style.display = "block";
    else
        m.style.display = "none";
} //flipClassic
function flipChildren()
{
    var m = document.getElementById('subcategorythree');
    if (m.style.display === "none" || m.style.display === "")
        m.style.display = "block";
    else
        m.style.display = "none";
} //flipChildren
function increaseQty() {
    var h = document.getElementById('mercCount').innerHTML;
    var thenum = parseInt(h);
    thenum += 1;
    var thestring = thenum.toString();
    document.getElementById('mercCount').innerHTML = thestring;
}
function decreaseQty() {
    var h = document.getElementById('mercCount').innerHTML;
    var thenum = parseInt(h);
    if (thenum > 0) {
        thenum -= 1;
    }
    var thestring = thenum.toString();
    document.getElementById('mercCount').innerHTML = thestring;
}
function highlightPage(page) {

    if (page === "watchmen" || page === "darkknight") {
        flipClassic();
        var h = document.getElementById(page);
        h.style.background = "hotpink";
    }
    if (page === "dilbert" || page === "samuraijack") {
        flipContemp();
        var h = document.getElementById(page);
        h.style.background = "hotpink";
    }
    if (page === "farside") {
        flipChildren();
        var h = document.getElementById(page);
        h.style.background = "hotpink";
    }
}

//////////////////////////Shopping Cart Utilities////////////////////////////////

function updateField() {
    console.log("updateField() WAS ACTUALLY CALLED! DON'T DELETE IT!!!!!")
}
function currentPageName() {
    var w = window.location.pathname;
    var dotIndex = w.lastIndexOf(".");
    var pagename = w.substring(27, dotIndex);
    return pagename;
}//return JUST the page name, no slashes, no dots before or after

function pageName(filePath) {
    var slashIndex = filePath.toString().lastIndexOf("/") + 1;
    var dotIndex = filePath.toString().lastIndexOf(".");
    if (dotIndex !== "-1" && slashIndex !== "-1") {
        var pageName = filePath.toString().substring(slashIndex, dotIndex);
        return pageName;
    }
    return filePath;
}//Used to get page name from a full file path.

var totalItems = 0;
function totalPricePerUnit(qtyName, rowNum) {
    console.log("got in totalPricePerUnit(qtyName=" + qtyName + ", rowNum=" + rowNum + ")");
    var price = 2.99;
    var qty = parseFloat(qtyName);
    console.log("qty=" + qty);
    var preTax = price * qty;
    console.log("preTax= " + preTax);
    var tax = 1.069;
    console.log("tax= " + tax);
    var totalPrice = preTax * tax;
    var roundedPrice = Math.ceil(100 * totalPrice) / 100;
    var roundedPrice = roundedPrice.toFixed(2);
    console.log("got to end of totalPricePerUnit roundedPrice= " + roundedPrice);
    if (rowNum !== null) {
        document.getElementsByName("totalPricePerUnit")[rowNum - 1].value = roundedPrice;
        return roundedPrice;
    }
    return roundedPrice;
}

function totalPrice(isRecal) {
    console.log("got in totalPrice");
    var totals = document.getElementsByName("totalPricePerUnit");
    document.cookie = "shipping=.03";
    var totalPrice = 0;
    for (var i = 0; i < totals.length; i++) {
        console.log("parseFloat(totals[" + i + "].value)=" + parseFloat(totals[i].value));
        var rowTotal = parseFloat(totals[i].value);
        console.log("made rowTotal of totals[" + i + "] =" + rowTotal);
        totalPrice += rowTotal;
    }
    console.log("got out of for, totalPrice=" + totalPrice);
    totalPrice = totalPrice.toFixed(2);
    if (isRecal) {
        document.getElementsByName("totalPriceBox")[0].value = "$" + totalPrice;
        console.log("got to end of totalPrice() returned: " + totalPrice);
    }
    return totalPrice;
}

function totalShipping(isRecal) {
    console.log("got in totalShipping");
    var shipType = getCookie("shipRate");
    console.log("got to if shipType=" + shipType);
    var shipRate
    if (shipType === "Parcel Post") {
        shipRate = .03;
    } else if (shipType === "Priority") {
        shipRate = .06;
    } else if (shipType === "2-day") {
        shipRate = .30;
    }
    var totalPrice = document.getElementsByName("totalPriceBox");
    var totalShipping = Math.ceil((shipRate * totalPrice[0].value) * 100) / 100;
    totalShipping = totalShipping.toFixed(2);
    if (isRecal) {
        if (totalShipping.length === 1) {
            totalShipping += "0";
        }
        document.getElementById("shippingTotalBox").innerHTML = totalShipping;
    }
    console.log("got to end of totalShipping(isRecal) totalShipping=" + totalShipping);
    if (totalShipping === "NaN") {
        return "choose shipping method";
    }
    return totalShipping;
}

function setTotalOrder(recal) {
    console.log("got in setTotalOrder()");
    var itemTot = document.getElementsByName("totalPriceBox");
    console.log("setTotalOrder() itemTot[0].value=" + itemTot[0].value);
    var shipTot = parseFloat(document.getElementById("shippingTotalBox").innerHTML.substring(1));
    console.log("setTotalOrder() shipTot=" + shipTot);
    var newTot = parseFloat(itemTot[0].value) + shipTot;
    console.log("setTotalOrder() newTot=" + newTot);
    newTot = Math.ceil(newTot * 100) / 100;
    newTot = newTot.toFixed(2);
    if (recal) {
        document.getElementById("orderTotalBox").value = "$" + newTot;
    }
    delCookie("orderTotal");
    document.cookie = "orderTotal=" + newTot;
    console.log("newTot=" + newTot);
    if (newTot === "NaN") {
        return "";
    }
    return newTot;
}

function checkCorrectShipping() {
    console.log("-----------------got in checkCorrectShipping()");
    var shipType = getCookie("shipRate");
    console.log("got to if shipType=" + shipType);
    if (shipType === "Parcel Post") {
        console.log("got in if");
        var wtf = document.getElementById("shipRadio1");
        wtf.checked = true;
        console.log("parcel should be checked");
    }
    if (shipType === "Priority") {
        console.log("in priority if");
        var wtf = document.getElementById("shipRadio2");
        wtf.checked = true;
    }
    if (shipType === "2-day") {
        var wtf = document.getElementById("shipRadio3");
        wtf.checked = true;
    }
}

function recalRow(name, num) {
    console.log("got in recalRow() name=" + name + " num=" + num);
    var newName = pageName(name).trim();
    console.log("got in recalRow()newName=" + newName + ", num=" + num);
    var rowNum = num.substring(num.lastIndexOf("d") + 1);
    console.log("recalRow rowNum=" + rowNum);
    var newQty = document.getElementsByName(num)[rowNum - 1].value;
    console.log("recalRow newQty=" + newQty);
    totalPricePerUnit(newQty, rowNum);
    totalPrice(true);
    totalShipping(true);
    changeShipping();
    setTotalOrder(true);
    delCookie(name);
    document.cookie = newName + "=" + newQty;
    console.log("recalRow() end document.cookie=" + document.cookie);
}

function changeShipping() {
    console.log("got in changeShipping()");
    var radios = document.getElementsByName("shipMethod");
    delCookie("shipping");
    var shipType;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            shipType = radios[i].value;
            console.log("got in for if shipType=" + shipType);
        }
    }
    var shipRate;
    if (shipType === "Parcel Post") {
        shipRate = .03;
    } else if (shipType === "Priority") {
        shipRate = .06;
    } else if (shipType === "2-day") {
        shipRate = .30;
    }
    delCookie("shipRate");
    document.cookie = "shipRate=" + shipType;
    var totalPrice = document.getElementsByName("totalPriceBox");
    var totalShipping = Math.ceil((shipRate * totalPrice[0].value) * 100) / 100;
    totalShipping = totalShipping.toFixed(2);
    console.log("changeShipping() totalShipping=" + totalShipping);
    document.cookie = "shipping=" + totalShipping;
    document.getElementById("shippingTotalBox").innerHTML = "$" + totalShipping;
    setTotalOrder(true);
    console.log("got to end of changing Order logic");

}

function getTotalQty() {
    console.log("got in getTotalQty()");
    var qtyCounter = document.getElementsByName("totalPricePerUnit");
    var qtyTotal = 0;
    for (var i = 1; i <= qtyCounter.length; i++) {
        console.log("got in for");
        var thisNum = document.getElementsByName("qtyOrdered" + i);
        console.log("thisNum of " + i + " =" + thisNum[0].value);
        qtyTotal += thisNum[0].value;
    }
    console.log("got to end of getTotalQty() with qtyTotal=" + qtyTotal);
    return qtyTotal;
}

function onProductPage() {
    var now = currentPageName().trim();
    console.log("got in isProductPage() now=" + now);
    if (now === "watchmen" || now === "farside" || now === "dilbert" || now === "samuraijack" || now === "darkknight") {
        return true;
    }
    else {
        return false;
    }
}

function isProductPage(now) {
    console.log("in isProductPage(now)");
    if (now === "watchmen" || now === "farside" || now === "dilbert" || now === "samuraijack" || now === "darkknight") {
        console.log("isProductPage(now) returned true");
        return true;
    }
    else {
        console.log("isProductPage(now) returning false");
        return false;
    }
}

function moveToCo() {
    newURL = "http://localhost:8383/250_CartoonSales_tkutzner/co.html";
    newURL2 = "co.html";
    console.log("made newURL");
    window.location = newURL;
    alert("tried to change page");
    return true;
}

/////////////////////////Checkout Page/////////////////////////////////
function primecoPage() {
    console.log("primecoPage() shipCountry Cookie=" + getCookie("shipCountry"));
    if (getCookie("shipCountry") === null) {
        document.cookie = "shipCountry=USA";
    }
    var cookies = document.cookie.split(";");
    var shipValues = [];
    var count = 0;
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].substring(1, 5) === "ship" && cookies[i].substring(5, 9) !== "Rate" && cookies[i].substring(5, 9) !== "ping") {
            console.log("primecoPage() made shipValues[" + count + "]=" + cookies[i]);
            shipValues[count] = cookies[i];
            count++;
        }
    }
    var billValues = [];
    var count = 0;
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].substring(1, 5) === "bill") {
            console.log("primecoPage() made billValues[" + count + "]=" + cookies[i]);
            billValues[count] = cookies[i];
            count++;
        }
    }
    for (var i = 0; i < billValues.length; i++) {
        var index = billValues[i].indexOf("=") + 1;
        var negIndex = billValues[i].indexOf("=");
        console.log("billValues[i].substring(0,negIndex)=" + billValues[i].substring(0, negIndex));
        var billIdString = billValues[i].substring(1, negIndex);
        console.log("billIdString=" + billIdString);
        var billId = document.getElementById(billIdString);
        console.log("assigned billId[" + i + "] & billValues[i].substring(index)=" + billValues[i].substring(index) + " billValues[i].substring(5,9)=" + billValues[i].substring(5, 9));
        if (billValues[i].substring(5, 9) === "Coun") {
            console.log("got in if billId=" + billId + "<---should be object");
            billId.selectedIndex = billValues[i].substring(index);
        }
        else {
            console.log("got in else");
            billId.value = billValues[i].substring(index);
        }
    }
    for (var i = 0; i < shipValues.length; i++) {
        var index = shipValues[i].indexOf("=") + 1;
        var negIndex = shipValues[i].indexOf("=");
        console.log("shipValues[i].substring(0,negIndex)=" + shipValues[i].substring(0, negIndex));
        var shipIdString = shipValues[i].substring(1, negIndex);
        var shipId = document.getElementById(shipIdString);
        if (shipValues[i].substring(5, 9) === "Coun") {
            shipId.selectedIndex = shipValues[i].substring(index);
        }
        else
            shipId.value = shipValues[i].substring(index);
    }
}

function cookieThis(value, name) {
    delCookie(name);
    document.cookie = name + "=" + value;
    console.log(document.cookie);
}
function fillForm() {
    var cookies = document.cookie.split(";");
    console.log("getShipData() cookies[1]=" + cookies[1]);
    console.log("getShipData() cookies[1].substring(1,5)=" + cookies[1].substring(1, 5));
    var billName = document.getElementById("billName");
    console.log("made billName.id=" + billName.id);
    var billAdd1 = document.getElementById("billAdd1");
    var billAdd2 = document.getElementById("billAdd2");
    var billCity = document.getElementById("billCity");
    var billCountry = document.getElementById("billCountry");
    console.log("billCountry.id=" + billCountry.id);
    var billPostCode = document.getElementById("billPostCode");

    var shipValues = [];
    var count = 0;
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].substring(1, 5) === "ship" && cookies[i].substring(5, 9) !== "Rate" && cookies[i].substring(5, 9) !== "ping") {
            console.log("fillForm() made shipValues[" + count + "]=" + cookies[i]);
            shipValues[count] = cookies[i];
            count++;
        }
    }
    console.log("got out of that for loop");
    for (var i = 0; i < shipValues.length; i++) {
        console.log("got in next for loop");
        console.log("fillform() shipValues[" + i + "].substring(5,9)=" + shipValues[i].substring(5, 9)) + " billName.id.substring(4, 8)=" + billName.id.substring(4, 8);
        if (shipValues[i].substring(5, 9) === billName.id.substring(4, 8)) {
            var index = shipValues[i].indexOf("=") + 1;
            console.log("index=" + index);
            billName.value = shipValues[i].substring(index);
            console.log("shipValues[i].substring(index)=" + shipValues[i].substring(index));
            document.cookie = billName.id + "=" + billName.value;
        }
        else if (shipValues[i].substring(5, 9) === billAdd1.id.substring(4, 8)) {
            var index = shipValues[i].indexOf("=") + 1;
            billAdd1.value = shipValues[i].substring(index);
            console.log("shipValues[i].substring(index)=" + shipValues[i].substring(index));
            document.cookie = billAdd1.id + "=" + billAdd1.value;
        }
        else if (shipValues[i].substring(5, 9) === billAdd2.id.substring(4, 8)) {
            var index = shipValues[i].indexOf("=") + 1;
            billAdd2.value = shipValues[i].substring(index);
            document.cookie = billAdd2.id + "=" + billAdd2.value;
        }
        else if (shipValues[i].substring(5, 9) === billCity.id.substring(4, 8)) {
            var index = shipValues[i].indexOf("=") + 1;
            billCity.value = shipValues[i].substring(index);
            document.cookie = billCity.id + "=" + billCity.value;
        }
        else if (shipValues[i].substring(5, 9) === billCountry.id.substring(4, 8)) {
            var index = shipValues[i].indexOf("=") + 1;
            console.log("country if set Index");
            console.log("country if set selectedIndex=" + shipValues[i].substring(index));
            billCountry.selectedIndex = shipValues[i].substring(index);
            document.cookie = billCountry.id + "=" + billCountry.value;
        }
        else if (shipValues[i].substring(5, 9) === billPostCode.id.substring(4, 8)) {
            var index = shipValues[i].indexOf("=") + 1;
            billPostCode.value = shipValues[i].substring(index);
            document.cookie = billPostCode.id + "=" + billPostCode.value;
        }
        console.log("got to end of for loop");
    }
    console.log("finished all of fillForm()");
}
function getShipData() {
    var cookies = document.cookie.split(";");
    var shipValues = [];
    console.log("getShipData() cookies[1]=" + cookies[1]);
    console.log("getShipData() cookies[1].substring(1,5)=" + cookies[1].substring(1, 5));
    var count = 0;
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].substring(1, 5) === "ship") {
            shipValues[count] = cookies[i];
            count++;
        }
    }
    for (var i = 0; i < shipValues.length; i++) {
        console.log(shipValues[i]);
    }
    return shipValues;
}
function fillCoTable() {

}


function isValidName(obj, phrase) {
    var per = 0;
    var name = obj.value.trim();
    if (name.length === 0) {
        intAlert(obj, phrase);
        return false;
    }
    for (var i = 0; i < name.length; i++) {
        var ch = name.charAt(i);
        if (isDigit(ch)) {
            intAlert(obj, phrase);
            return false;
        }
        if (ch === '.')
            per++;
        if (per > 2) {
            intAlert(obj, phrase);
            return false;
        }
    }
    return true;

}

function isValidAddress(obj, phrase) {
    var address = obj.value;
    if (address.length === 0) {
        intAlert(obj, phrase);
        return false;
    }
    else
        return true;
}

function isValidZip(obj, phrase) {
    var zip = obj.value;
    var zipCount = 0;
    for (var i = 0; i < zip.length; i++) {
        if (isDigit(zip[i])) {
            zipCount++;
        }
    }
    if (zipCount === 5) {
        return true;
    }
    var zipCount2 = 0;
    for (var i = 0; i < zip.length; i++) {
        if (isDigit(zip[i])) {
            zipCount2++;
        }
        if (i === 5 && zip[i] !== "-") {
            intAlert(obj, phrase);
            return false;
        }
    }
    if (zipCount2 === 9) {
        return true;
    }
    intAlert(obj, phrase);
    return false;
}

function checkForm() {
    var valForm = document.infoForm;
    if (!isValidName(valForm.shipNameN, "You entered an invalid Name"))
        return false;
    if (!isValidName(valForm.billNameN, "You entered an invalid Name"))
        return false;
    if (!isValidAddress(valForm.shipAdd1N, "Please enter an address."))
        return false;
    if (!isValidAddress(valForm.billAdd1N, "Please enter an address."))
        return false;
    if (!isValidName(valForm.shipCityN, "Invalid City."))
        return false;
    if (!isValidName(valForm.billCityN, "Invalid City."))
        return false;
    if (!isValidZip(valForm.shipPostCodeN, "Invalid zipcode. Please enter valid zipcode."))
        return false;
    if (!isValidZip(valForm.billPostCodeN, "Invalid zipcode. Please enter valid zipcode."))
        return false;
}

function intAlert(obj, phrase) {
    obj.focus();
    alert(phrase);
}

function isDigit(ch) {
    return ('0' <= ch && ch <= '9');
}