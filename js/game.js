window.answer = newNumber()

$(document).on('ready', function() {
  $('.attempt').focus()
})

$(document).on('submit', '#attempt', function(event) {
  guess(this.elements[0].value)
  this.elements[0].value = ''
  return false
})

$(document).on('click', '#restart', function(event) {
  restart()
  return false
})

function guess(number) {
  outcome = testAgainstAnswer(window.answer, number)
  counter = $('.guess').length + 1
  if(outcome[0] == 4) {
    window.guessHtml = $('.guess-area').html()
    $('.guess-area').html('♛<br>oh yeah!<br><span class=wow>' + number + '</span> is right!<br>you got it at the <span class=b>' + nth(counter) + '</span> attempt.<br>' + feedback(counter) + '<br><a href="#" class="restart" id="restart">Restart!</a>')
    $('#restart').focus()
  } else {
    $('#guesses').prepend('<div class=guess><div class=counter>attempt ' + counter + '</div><div class=number>' + number + '</div><div class=outcome><span class=a>' + outcome[0] + 'a</span><span class=b>' + outcome[1] + 'b'  + '</span></div></div>')
  }
  return false
}

function restart() {
  window.answer = newNumber()
  $('#guesses').html('')
  $('.guess-area').html(guessHtml)
  $('.attempt').focus()
}

function feedback(times) {
  if(times == 1) {
    return "Waaaat???"
  } else if (times == 2) {
    return "you cheated, right?"
  } else if (times == 3) {
    return "you lucky cat."
  } else if (times == 4) {
    return "I don't believe you, play again!"
  } else if (times == 5) {
    return "wow so good!"
  } else if (times <= 10) {
    return "you've got skills!"
  } else if (times <= 20) {
    return "good job yo!"
  } else if (times <= 30) {
    return "meh.. I think you can do better."
  } else if (times <= 40) {
    return "lolol wat?"
  } else if (times <=550) {
    return "some people got skills, some people..."
  } else {
    return "I don't think you know how to play this game.."
  }
}

function newNumber() {
  return (Math.random()).toString().slice(2,6)
}

function testAgainstAnswer(answer, attempt) {
  answer_arr  = answer.toString().split("")
  attempt_arr = attempt.split("")
  a = 0
  b = 0

  $.each(answer_arr, function(index, num) {
    if(attempt_arr[index] == answer_arr[index]) {
      answer_arr[index] = 'x'
      attempt_arr[index] = 'o'
      a+=1
    }
  })

  $.each(answer_arr, function(index, num) {
    if (answer_arr.indexOf(attempt_arr[index]) >= 0) {
      answer_arr[answer_arr.indexOf(attempt_arr[index])] = ''
      b+=1
    }
  })

  return [a, b]
}

// -----------------------------------------------

// Helpers
//
// Order of things
function nth(number) {
  ordered  = number.toString()
  leftover = number % 10
  if(number > 3 && number < 21) {
    ordered += '<sup>th</sup>'
  } else if(leftover == 1) {
    ordered += '<sup>st</sup>'
  } else if(leftover == 2) {
    ordered += '<sup>nd</sup>'
  } else if(leftover == 3) {
    ordered += '<sup>rd</sup>'
  } else {
    ordered += '<sup>th</sup>'
  }
  return ordered
}
