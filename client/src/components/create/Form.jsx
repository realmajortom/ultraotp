import React, {useState} from 'react';

export default function Form(props) {
	const [secretVis, setSecretVis] = useState(false);
	const [advVis, setAdvVis] = useState(false);

	const toggleAdv = e => {
		e.preventDefault();
		setAdvVis(!advVis);
	};

	return (
		<>
			<form className='entryForm'>


				<div className='formGroup'>
					<label htmlFor='issuer'>Issuer</label>
					<input
						type='text'
						id='issuer'
						name='issuer'
						value={props.issuer}
						autoComplete='off'
						required
						className='primaryInput'
						onChange={e => props.setIssuer(e.target.value)}/>
				</div>


				<div className='formGroup'>
					<label htmlFor='name'>Label</label>
					<input
						type='text'
						id='name'
						name='name'
						value={props.name}
						autoComplete='off'
						className='primaryInput'
						onChange={e => props.setName(e.target.value)}/>
				</div>


				<div className='formGroup'>

					<label htmlFor='name'>Secret</label>
					<input
						type={secretVis ? 'text' : 'password'}
						id='secret'
						name='secret'
						value={props.secret}
						autoComplete='new-password'
						required
						className='primaryInput'
						onChange={e => props.setSecret(e.target.value)}
					/>

					<div className='checkContainer'>
						<input
							type='checkbox'
							id='secCheck'
							name='secCheck'
							onChange={() => setSecretVis(!secretVis)}
						/>
						<label htmlFor='secCheck'>Show Secret</label>
					</div>

				</div>


				<div style={advVis ? {display: 'flex'} : {display: 'none'}} className='advContainer'>

					<div className='formGroup'>
						<label htmlFor='type'>Type</label>
						<select
							id='type'
							name='type'
							className='primarySelect'
							onChange={e => props.setType(e.target.value)}
							value={props.type}
						>
							<option value='totp'>TOTP</option>
							<option value='hotp'>HOTP</option>
						</select>
					</div>


					<div className='formGroup'>
						<label htmlFor='period'>{props.type === 'hotp' ? 'Counter' : 'Period (in seconds)'} </label>
						<input
							type='text'
							id='period'
							name='period'
							value={props.period}
							autoComplete='off'
							className='primaryInput'
							onChange={e => props.setPeriod(e.target.value)}/>
					</div>


					<div className='formGroup'>
						<label htmlFor='digits'>Digits</label>
						<select
							id='digits'
							name='digits'
							className='primarySelect'
							onChange={e => props.setDigits(e.target.value)}
							value={props.digits}
						>
							<option value='6'>6</option>
							<option value='8'>8</option>
						</select>
					</div>


					<div className='formGroup'>
						<label htmlFor='algo'>Algorithm</label>
						<select
							id='algo'
							name='algo'
							className='primarySelect'
							onChange={e => props.setAlgo(e.target.value)}
							value={props.algo}
						>
							<option value='SHA1'>SHA1</option>
							<option value='SHA256'>SHA256</option>
							<option value='SHA512'>SHA512</option>
						</select>
					</div>

				</div>


				<div className='formGroup'>
					<button onClick={e => toggleAdv(e)} className='advBtn'>
						{advVis ? `Hide` : `More Options`}
					</button>
				</div>


				<input type='submit' className='primaryBtn userBtn' onClick={e => props.submit(e)} value='Submit'/>


			</form>
		</>
	);
}