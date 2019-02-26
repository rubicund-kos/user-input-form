window.addEventListener("load", init, false);

function init() {
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		var inp = inputs[i];
		if (inp.type != "text") continue; //Пропускаем инпуты не текстового типа
		if (inp.dataset.charsAllowed == undefined) continue; //Пропускаем инпуты у которых нет атрибута data-chars-allowed
		inp.addEventListener("keypress", keyFilter, false);
	}

	function keyFilter(event) {
		if (!event) event = window.event;

		if(event.charCode == 0 || event.charCode < 32) return true;

		var allowedText = event.target.dataset.charsAllowed; //значение атрибута data-chars-allowed
		var messageError = event.target.dataset.messageId; //значение атрибута в span                                                                                                        
		var symbol = String.fromCharCode(event.charCode).toLowerCase(); //Введённый символ с клавиатуры

		if(allowedText.search(symbol) == -1) {
			if(messageError) {
				messageError = document.getElementById(messageError);
				messageError.style.visibility = "visible";
			}
			//отменяем ввод символа в поле ввода
			event.preventDefault();
			return false;
		}
		else {
			if(messageError) {
				messageError = document.getElementById(messageError);
				messageError.style.visibility = "hidden";
			}
			return true;
		}

	}


}