const img_list = ['block.jpg', 'bear.jpg', 'royce.jpg'];
const prog_list = ['block', 'bear', 'royce']
var trial = 1;

$(document).ready(function() {
    $('#expt1').hide();
    $('#expt_select_1').hide();
    $('#expt2').hide();
    $('#expt_select_2').hide();
    $('#expt3').hide();
    $('#expt_select_3').hide();
    $('#warning_box').hide();
    $('#notif_box').hide();
});

class subject {
    constructor () {
        this.subj_num = 1; // Only for one subject
        this.human;
        this.responses = [];
    }
}

var subj = new subject();

function submit_instruc() {
    const response = $('input[name = "human"]:checked').val();
    if (check_if_responded(response)) {
        $('#instruc_box').hide();
        if (response == 1) {
            is_human();
            $('#expt1').show();
            $('#expt_select_1').show();
        } 
        else {
            is_not_human();
        }
    } 
}

function submit_expt() {
    const response = $('input[name = "'+prog_list[trial - 1]+'"]:checked').val();
    if (check_if_responded(response)) {
        $('#instruc_warning').hide();
        subj.responses.push(response);
        $('#expt'+trial).hide();
        $('#expt_select_'+trial).hide();
        trial++;
        if (trial > 3) {
            $('#notif_box').text(
                'Subject number: ' + subj.subj_num
                + ' Human: ' + subj.human
                + ' First rating: ' + subj.responses[0]
                + ' Second rating: ' + subj.responses[1]
                + ' Third rating: ' + subj.responses[2]
            );
            $('#notif_box').show();
        }
        $('#expt'+trial).show();
        $('#expt_select_'+trial).show();
        //$('#warning_box').hide();
    } else {
        $('#instruc_warning').text('Please make a selection');
    }
}

function submit_expt_final() {
    const response = $('input[name = "expt_option"]:checked').val();
    if (check_if_responded(response)) {
        subj.responses.push(response);
        $('#notif_box').text('wha');
        $('#notif_box').html('Subject number: ' + subj.subj_num);
        $('#notif_box').html('Human: ' + subj.human);
        $('#notif_box').html('First rating: ' + subj.responses[0]);
        $('#notif_box').html('Second rating: ' + subj.responses[1]);
        $('#notif_box').html('Third rating: ' + subj.responses[2]);
        $('#notif_box').show();
    } else {
        $('#instruc_warning').text('Please make a selection');
    }
}

function test() {
    document.getElementById("demo").innerHTML = "Hello World";
}

function check_if_responded(input) {
    if (typeof (input) == 'undefined') {
        $('#warning_box').text('Please make a selection. Thank you!');
        $('#warning_box').show();
        return false;
    }
    else {return true;}
}

function is_human() {
    subj.human = true;
    $('.text-box').hide();
}

function is_not_human() {
    subj.human = false;
    halt_exp('Robots cannot participate, we apologize.');
}

function halt_exp(why) {
    $('.text-box').hide();
    $('#warning_box').text(why);
    $('#warning_box').show();
}