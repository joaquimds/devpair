const React = require('react');

module.exports = React.createClass({

    getInitialState: function () {
        return { loading: true }
    },

    componentWillMount: function () {
        this.form = {};

        this.update();
    },

    update: function () {
        fetch('/api/users/me', {
            method: 'get',
            credentials: 'include'
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ loading: false, user: data });
            })
            .catch(err => {
                console.err(err);
            });
    },

    login: function (e) {
        this.setState({ loading: true });
        fetch('/api/users/login', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name: this.form.name.value, password: this.form.password.value })
        })
            .then(() => {
                this.update();
            });
    },

    render: function () {
        if (this.state.loading) {
            return <div className="user">Loading...</div>
        }
        return (
            <div>
                <form onSubmit={this.login}>
                    <input id="name" ref={(el) => { this.form.name = el }}/>
                    <input id="password" type="password" ref={(el) => { this.form.password = el }}/>
                    <button>Login</button>
                </form>
                <div className="user">
                    <h1>{ this.state.user.name }</h1>
                    <h2>{ this.state.user.job }</h2>
                </div>
            </div>
        )
    }

});
