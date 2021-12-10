// Get Data From Check Box
let limit = 0,
  category = '',
  output = '',
  apiURL = '',
  pronoun = '',
  img = '',
  imgPlaceHolder = '<img class="placeholder" src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iNTEyIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNTU1OGZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBjMGZmIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjI1NiIgeDI9IjI1NiIgeTE9IjQ1MiIgeTI9IjkxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNhZGRjZmYiLz48c3RvcCBvZmZzZXQ9Ii41MDI4IiBzdG9wLWNvbG9yPSIjZWFmNmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWFmNmZmIi8+PC9saW5lYXJHcmFkaWVudD48Zz48Zz48Zz48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIGZpbGw9InVybCgjU1ZHSURfMV8pIiByPSIyNTYiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0zMzEgMTY2YzAtNDEuMzU1LTMzLjY0NS03NS03NS03NXMtNzUgMzMuNjQ1LTc1IDc1IDMzLjY0NSA3NSA3NSA3NSA3NS0zMy42NDUgNzUtNzV6bS03NSA3NWMtNzQuNDM5IDAtMTM1IDYwLjU2MS0xMzUgMTM1djE0LjA1OGMwIDQuMjY0IDEuODE0IDguMzI2IDQuOTkgMTEuMTcxIDM2LjUzOCAzMi43NCA4Mi43MSA1MC43NzEgMTMwLjAxIDUwLjc3MSA0Ny4zMDEgMCA5My40NzMtMTguMDMxIDEzMC4wMS01MC43NzEgMy4xNzYtMi44NDUgNC45OS02LjkwOCA0Ljk5LTExLjE3MXYtMTQuMDU4YzAtNzQuNDM5LTYwLjU2MS0xMzUtMTM1LTEzNXoiIGZpbGw9InVybCgjU1ZHSURfMl8pIi8+PC9nPjwvZz48L2c+PC9zdmc+" />';

// Get Default Value
limit = $('#limit').val();
category = $('input.select-box__input:checked', '#filter').val()

$('#filter').submit((e) => {
  e.preventDefault();
})

// If Variables Changed
$('#filter input').on('input', () => {

    limit = $('#limit').val();
    category = $('input.select-box__input:checked', '#filter').val()
    // Make the call
    forbes();

});

// Make the call for first time
forbes();

function forbes() {
  // Create URL
  apiURL = 'https://forbes400.herokuapp.com/api/forbes400' + '/' + category + '?limit=' + limit

  // Send Data To API
  $.ajax({
    type: "get",
    url: apiURL,
    success: function (response) {
      createHTML(response);
    },
    error: function (request) {
      alert(request.status + ' ' + request.statusText);
    },
    beforeSend: function () {
      $('#loader').show('slow');
    },
    complete: function () {
      $('#loader').hide('slow');
    }

  });

}

function createHTML(response) {

  $('.profiles').html('');

  $.map(response, (val) => {

    pronoun = (val.gender === 'M') ? 'He' : 'She';
    img = (val.squareImage) ? `<img src="${val.squareImage}" alt="${val.personName}">` : imgPlaceHolder;

    output = `
    <div class="col-sm-6 col-lg-6 d-flex align-items-stretch">
      <div class="card d-flex flex-column flex-md-row border-0 rounded-0 mb-3">
          <div class="card-header p-0 border-0">
            ${img}
          </div>
          <div class="card-body d-flex flex-column">
              <h5 class="card-title">${val.person.name}</h5>
              <p class="card-text">
              ${pronoun} is ${(new Date().getFullYear()) - (new Date(val.birthDate).getFullYear())} years old. Lives in ${val.city}, ${val.countryOfCitizenship}.
              And in the ${val.industries[0]} industry
              </p>
              <div class="info">
                  <small class="badge badge-warning">Rank: ${val.rank}</small>
                  <small class="badge badge-success">Property: ${val.finalWorth.toString().slice(0, 3) + '.' + val.finalWorth.toString().slice(3, 4)} B</small>
              </div>
          </div>
      </div> 
    </div>`


    $('.profiles').append(output);
  });

}