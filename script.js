var btnInicio = document.getElementById('btnIniciar');
var counter = document.getElementById('counter');

var urlServer = 'http://cbtis148.edu.mx/cbtis148.edu.mx/test/alumnos.php?todosun';
var urlLocal = 'http://localhost:8080/index.php';

var con = 0;


btnInicio.addEventListener('click', () => {
    axios.get(urlServer).then(res => {
        var users = res.data;

        users.map((use, key) => {
            var ns = use.nombre.split(' ');
            var l = ns.length - 1;
            var n = ns[l][0] + use.codigoControl.toString().substr(-5, use.codigoControl.toString().length);

            axios.post(urlLocal, {
                nombre: use.nombre,
                numeroControl: use.codigoControl,
                username: n,
                last_login: '00-00-0000',
                password: use.codigoControl
            }).then(res => {
                con++;
                counter.innerText = con;
                console.log(res.data);
            }).catch(error => {
                console.log("ERROR", error);
            });
        });
    }).catch(err => {
        console.log(err);
    })
});
