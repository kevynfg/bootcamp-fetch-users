let infoSearch = document.querySelector('.info');
let itemsSearch = document.querySelector('.items');
let buttonSearch = document.querySelector('#buttonSearch');
let inputSearch = document.querySelector('#search');
let allPeople = [];
let newPeople = [];
let femaleCount = [];
let maleCount = [];
let peopleCount = null;

window.addEventListener('load', () => {
  Fetching();
});

async function Fetching() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json(res);

  allPeople = json.results
    .map(({ name, picture, gender, dob }) => {
      return {
        name: `${name.first} ${name.last}`,
        picture: picture.thumbnail,
        gender: gender,
        dob: dob.age,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  allPeople.forEach((user) => {
    const { gender } = user;
    if (gender == 'female') {
      femaleCount = [...femaleCount, gender];
    } else if (gender == 'male') {
      maleCount = [...maleCount, gender];
    }
  });

  const somaIdade = allPeople.reduce((accumulator, current) => {
    return accumulator + current.dob;
  }, 0);

  showGender(maleCount.length, femaleCount.length);
  somaIdades(somaIdade);
  mediaIdades(somaIdade / allPeople.length);
  renderPeople(allPeople);
}

const renderPeople = (peoples) => {
  itemsSearch.innerHTML = '';
  let output = '';
  peoples.forEach((people) => {
    peopleCount++;
    const { name, picture, dob } = people;
    output += `
        <tr>
        <td><img src="${picture}"> ${name}, ${dob} anos</td>
        </tr>
        `;
  });
  peopleCount = peoples.length;
  itemsSearch.innerHTML = `<tr><th>${peopleCount} Usuário(s) foram encontrado(s)</th></tr>`;
  itemsSearch.innerHTML += output;
};

inputSearch.addEventListener('keyup', (event) => {
  femaleCount = [];
  maleCount = [];
  if (event.keyCode === 13) {
    peopleCount--;
    event.preventDefault();
    const element = event.target.value.toLowerCase();
    newPeople = allPeople
      .filter((name) => name.name.toLowerCase().includes(element))
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

    newPeople.forEach((user) => {
      const { gender } = user;
      if (gender == 'female') {
        femaleCount = [...femaleCount, gender];
      } else if (gender == 'male') {
        maleCount = [...maleCount, gender];
      }
    });

    const somaIdade = newPeople.reduce((accumulator, current) => {
      return accumulator + current.dob;
    }, 0);

    showGender(maleCount.length, femaleCount.length);
    somaIdades(somaIdade);
    mediaIdades(somaIdade / newPeople.length);

    if (newPeople.length === 0) {
      infoSearch.innerHTML = 'Não há estatísticas';
      renderPeople(newPeople);
    } else {
      renderPeople(newPeople);
    }
  }
});

function showGender(male, female) {
  let output = '';
  infoSearch.innerHTML = `<tr><th>Estatísticas</th></tr>`;
  output += `<td>Sexo masculino: ${male}</td>`;

  output += `<tr><td>Sexo Feminino: ${female}</td></tr>`;
  infoSearch.innerHTML += output;
}

function somaIdades(idades) {
  let output = '';
  output = `<tr><td>Soma das idades: ${idades}</td></tr>`;
  infoSearch.innerHTML += output;
}

function mediaIdades(idades) {
  let output = '';
  output = `<tr><td>Média das idades: ${idades.toFixed()}</td></tr>`;
  infoSearch.innerHTML += output;
}

function buttonEvent() {
  femaleCount = [];
  maleCount = [];
  peopleCount--;
  const element = inputSearch.value.toLowerCase();
  newPeople = allPeople
    .filter((name) => name.name.toLowerCase().includes(element))
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

  newPeople.forEach((user) => {
    const { gender } = user;
    if (gender == 'female') {
      femaleCount = [...femaleCount, gender];
    } else if (gender == 'male') {
      maleCount = [...maleCount, gender];
    }
  });

  const somaIdade = newPeople.reduce((accumulator, current) => {
    return accumulator + current.dob;
  }, 0);

  showGender(maleCount.length, femaleCount.length);
  somaIdades(somaIdade);
  mediaIdades(somaIdade / newPeople.length);

  if (newPeople.length === 0) {
    infoSearch.innerHTML = 'Não há estatísticas';
    renderPeople(newPeople);
  } else {
    renderPeople(newPeople);
  }
}

inputSearch.addEventListener('keyup', () => {
  femaleCount = [];
  maleCount = [];
  if (inputSearch.value === '') {
    const somaIdade = allPeople.reduce((accumulator, current) => {
      return accumulator + current.dob;
    }, 0);

    allPeople.forEach((user) => {
      const { gender } = user;
      if (gender == 'female') {
        femaleCount = [...femaleCount, gender];
      } else if (gender == 'male') {
        maleCount = [...maleCount, gender];
      }
    });

    showGender(maleCount.length, femaleCount.length);
    renderPeople(allPeople);
    somaIdades(somaIdade);
    mediaIdades(somaIdade / allPeople.length);
  }
});
