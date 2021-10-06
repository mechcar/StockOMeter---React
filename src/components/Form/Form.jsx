const Form = (props) => {
	return (
		<section className="search">
			<div className="wrapper">
				<label htmlFor="search"></label>
				<form
					action="submit"
					id="search"
					onSubmit={props.handleSubmit}
				>
					<input
						type="text"
						id="search"
						onChange={props.handleChange}
						value={props.userInput}
						autoComplete="off"
						placeholder="Search for a stock..."
					/>
					<button type="submit" id="search">
						Submit
					</button>
				</form>
			</div>
		</section>
	);
};
export default Form;