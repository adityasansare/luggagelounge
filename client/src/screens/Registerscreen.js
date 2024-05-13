import { useState } from 'react';
import axios from 'axios';
import Success from '../components/Success';
import Error from '../components/Error';
import Loader from '../components/Loader';

function Registerscreen() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const [error, seterror] = useState('');
  const [success, setsuccess] = useState('');
  const [loading, setloading] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      register();
    }
  };

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
      };

      try {
        setloading(true);
        const result = await axios.post('https://luggagelounge-server.vercel.app/api/users/register', user, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
        setsuccess(true);
        setloading(false);
        setname('');
        setemail('');
        setpassword('');
        setcpassword('');

        // Use setTimeout to redirect to a different page after 5 seconds
        setTimeout(() => {
          window.location.href = '/login'; // Replace 'other-page' with the actual URL you want to redirect to
        }, 5000); // 5000 milliseconds (5 seconds)
      } catch (error) {
        console.log(error);
        seterror(true);
        setloading(false);
      }
    } else {
      alert('Passwords not matched');
    }
  }

  return (
    <div className="container">
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          {success && <Success message="Registration Success ... Redirecting in 5 Secs" />}
          {error && <Error message="You Need To Enter Your Details" />}

          <div className="bs blacky">
            <h2>SignUp</h2>

            <input
              type="text"
              className="form-control"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <input
              type="text"
              className="form-control"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              required
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <button className="btn mt-3" onClick={register}>
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
