document.querySelector('.input1').addEventListener('click', (e) => {
    document.querySelector('.input2').value = "";
    document.querySelector('.label2').innerHTML = "Mot de Passe";
    document.querySelector('.label1').innerHTML = "";

});

document.querySelector('.input2').addEventListener('click', (e) => {
    document.querySelector('.input1').value = "";
    document.querySelector('.label1').innerHTML = "Email";
    document.querySelector('.label2').innerHTML = "";

});