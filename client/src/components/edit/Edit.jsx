import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import Alert from '../generic/Alert';
import Form from '../create/Form';
import API from '../../helpers/data-api';


export default function Edit() {
	const {id} = useParams();

	const [cancel, setCancel] = useState(null);
	const [message, setMessage] = useState('');
	const [loaded, setLoaded] = useState(false);

	const [digits, setDigits] = useState('');
	const [issuer, setIssuer] = useState('');
	const [period, setPeriod] = useState('');
	const [secret, setSecret] = useState('');
	const [type, setType] = useState('');
	const [name, setName] = useState('');
	const [algo, setAlgo] = useState('');


	useEffect(() => {
		API.get(`/token/${id}`).then(res => {
			if (res.data.success) {
				const t = res.data.token;
				setDigits(t.digits);
				setIssuer(t.issuer);
				setPeriod(t.period);
				setSecret(t.secret);
				setType(t.type);
				setName(t.name);
				setAlgo(t.algo);
				setLoaded(true);
			} else {
				setMessage(res.data.message);
			}
		});
	}, [id]);


	const submit = e => {
		e.preventDefault();

		API.post(`/update/${id}`, {
			digits: digits,
			issuer: issuer,
			period: period,
			secret: secret,
			type: type,
			name: name,
			algo: algo
		}).then(res => {
			if (res.data.success) {
				setCancel(true);
			} else {
				setMessage(res.data.message);
			}
		});
	};


	const deleteToken = () => {
		if (window.confirm('Are you sure you want to delete this token?')) {
			API.post(`/delete/${id}`).then(res => {
				if (res.data.success) {
					setCancel(true);
				} else {
					setMessage(res.data.message);
				}
			});
		}
	};


	if (cancel || !id) {
		return (
			<Redirect to='/list'/>
		);
	} else {
		return (
			<div>

				<Alert message={message} close={() => setMessage('')}/>

				<div className='homeHeader'>
					<h1>Edit</h1>

					<div className='homeLinksWrapper linkFlexRight'>
						<button className='primaryBtn alertBtn cancelBtn btnFlex' onClick={() => setCancel(true)}>Cancel</button>
						<button className='primaryBtn logoutBtn' onClick={() => deleteToken()}>Delete Token</button>
					</div>
				</div>


				<div className='otpFormWrapper' style={loaded ? {display: 'block'} : {display: 'none'}}>

					<Form
						algo={algo}
						digits={digits}
						issuer={issuer}
						name={name}
						period={period}
						secret={secret}
						type={type}
						submit={submit}
						setIssuer={setIssuer}
						setName={setName}
						setSecret={setSecret}
						setType={setType}
						setPeriod={setPeriod}
						setDigits={setDigits}
						setAlgo={setAlgo}
					/>

				</div>


			</div>
		);
	}
}