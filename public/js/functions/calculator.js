$(function () {
    let data = [
        {
            id: 1,
            label: "UMEE",
            yearly_dollar_earning: 0.00000647,
            yearly_return: 29,
        },
        {
            id: 2,
            label: "Cosmos",
            yearly_dollar_earning: 0.00634,
            yearly_return: 19,
        },
        {
            id: 3,
            label: "Evmos",
            yearly_dollar_earning: 0.521,
            yearly_return: 110,
        },
        {
            id: 4,
            label: "Axelar",
            yearly_dollar_earning: 0.0695,
            yearly_return: 13,
        },
    ];

    let selected_token = data[0];
    let sliderValue = 200000;
    data.forEach((item) => {
        initialDropDown(item.id, item.label);
    });
    updateTokenData();

    function updateTokenData(id) {
        if (id != null && id !== "undefined") {
            selected_token = data.find((item) => item.id === id);
        }
        const { label } = selected_token;

        const yearly = selected_token.yearly_return;
        const dollar = selected_token.yearly_dollar_earning;

        $(".yearly_return_percentage").text("+" + yearly + "%");
        $("#dropdownMenuButton").text(label);
        $(".token_name").text(label);

        const selectedVal = Big(sliderValue);
        const yearlyEarning = Big(dollar);
        const yearlyVal = selectedVal.times(yearlyEarning);
        const yearlyEarnVal = yearlyVal.div(12);
        const dailyEarnVal = yearlyVal.div(365);

        $("#yearly_earn_val").text("$" + convertNum(yearlyVal));
        $("#monthly_earn_val").text("$" + convertNum(yearlyEarnVal));
        $("#daily_earn_val").text("$" + convertNum(dailyEarnVal));

        const yearlyReturn = Big(yearly);
        const yearlyToken = selectedVal.times(yearlyReturn).div(100);
        const monthlyToken = yearlyToken.div(12);
        const dailyToken = yearlyToken.div(365);

        $("#yearly_earn_token_val").text(`${convertNum(yearlyToken)} ${label}`);
        $("#monthly_earn_token_val").text(`${convertNum(monthlyToken)} ${label}`);
        $("#daily_earn_token_val").text(`${convertNum(dailyToken)} ${label}`);

        $("#range_input_txt").val(function () {
            return sliderValue === 0 ? "0" : sliderValue.toLocaleString("en-US");
        });
    }

    function convertNum(number) {
        if (number > 1000) return number.toFixed(2);
        if (number > 100) return number.toFixed(3);
        if (number > 10) return number.toFixed(4);
        return number.toFixed(6);
    }

    $(document).ready(function ($) {
        let rangeSlider = document.querySelector(".range");
        rangeSlider.addEventListener("input", handleInputChange);
        rangeSlider.value = sliderValue;
        setSliderColor(rangeSlider);
        document.querySelector(".range_min").textContent = rangeSlider.min;
        document.querySelector(".range_max").textContent = parseInt(
            rangeSlider.max
        ).toLocaleString("en-US");

        $("#range_input_txt").on("keyup", function (event) {
            var selection = window.getSelection().toString();
            if (selection !== "") {
                return;
            }
            // When the arrow keys are pressed, abort.
            if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
                return;
            }
            var $this = $(this);
            // Get the value.
            var input = $this.val();
            input = input.replace(/[\D\s\._\-]+/g, "");
            input = input ? parseInt(input, 10) : 0;
            sliderValue = input;
            rangeSlider.value = sliderValue;

            updateTokenData();

            const min = parseInt(rangeSlider.min);
            const max = parseInt(rangeSlider.max);

            rangeSlider.style.backgroundSize =
                ((sliderValue - min) * 100) / (max - min) + "% 100%";
        });

        $("#range_input_txt").on("keydown", function (event) {
            let number = event.key;

            if ((isNaN(number) && event.which != 8) || event.which === 32) {
                event.preventDefault();
                return;
            }

            var $this = $(this);
            var input = $this.val() + event.key;
            input = input.replace(/[\D\s\._\-]+/g, "");
            let rangeSlider = document.querySelector(".range");
            const min = parseInt(rangeSlider.min);
            const max = parseInt(rangeSlider.max);
            const val = parseInt(input);
            if (val < min || val > max) {
                event.preventDefault();
                return;
            }
        });

        $(".arrow-up").on("click", function () {
            if (sliderValue <= rangeSlider.max - 100) {
                sliderValue += 100;
                updateTokenData();
            }
        });

        $(".arrow-down").on("click", function () {
            if (sliderValue >= 100) {
                sliderValue -= 100;
                updateTokenData();
            }
        });
    });

    function initialDropDown(dataId, title) {
        $("<li/>", {
            // "class": "myDiv",
            attr: { "data-id": dataId },
            on: {
                click: function () {
                    updateTokenData($(this).data("id"));
                },
            },
            append: '<a class="dropdown-item" href="#dd">' + title + "</a>",
            appendTo: "#calcDropdown",
        });
    }

    function handleInputChange(e) {
        let target = e.target;
        if (e.target.type !== "range") {
            target = document.getElementById("range");
        }
        const min = target.min;
        const max = target.max;
        sliderValue = parseInt(target.value);
        updateTokenData();
        target.style.backgroundSize =
            ((sliderValue - min) * 100) / (max - min) + "% 100%";
    }

    function setSliderColor(target) {
        const min = target.min;
        const max = target.max;
        const val = target.value;

        target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
    }
});
