import {  useEffect,useState } from "react"
import axios from 'axios'
import GoalItem from  "../components/GoalItem"

function Dashboard(){

	const [goals, setGoals] = useState([])
	const [fGoal, setFgoal] = useState({goal:'', start: new Date() , end : new Date()})

	useEffect(()=>{
		axios.get('/api/goals').then((res)=> setGoals(res.data))
			//console.log(data)
			//setGoals(data)

	},[])
	const onSub = (e)=>{
		e.preventDefault()
		
		//const pickerTab = ['#03D5B7','#E1E3E3', '#6FCA51', '#7C69EA', '#FBC805', '#9231FC', '#46CAF9', '#FF0CFB' ]
		
		//const color = pickerTab[Math.floor(Math.random()*9)]
		//send items to goal data base
		setGoals(goals=> [...goals, {id:goals.length+1 ,...fGoal}])
		//console.log(fGoal)
		axios.post('api/goals',{...fGoal}).then(res=> console.log('data post'))
		setFgoal({goal:'',end: fGoal.end, start:fGoal.start ,color })
		
	}

    function onDeleteGoal(id) {
		axios.delete(`/api/goals/${id}`).then(()=>setGoals(prev => prev.filter(item => item._id !== id)))

		console.log(`Deleting ietm has id :${id}`)
    }



	return (
		<>         
		<section className='form'>
            <form onSubmit={onSub}>
                <div className='form-group'>
                    <label htmlFor='goal'>Goals</label>
					<input
					required
                        type='text'
                        name='goal'
                        id='goal'
                        value={fGoal.goal}

					onChange={(e) => setFgoal((val)=>( {...val, [e.target.name ] : e.target.value}))}
				/>

                    <label htmlFor='start'>Start :</label>

				<input
				type='date'
				name='start'
				className="date_pick"
				required
					onChange={(e) => setFgoal((val)=>( {...val, [e.target.name ] : e.target.value}))}
				/>
                    <label htmlFor='start'>End :</label>
					<input
					required
				type='date'
				name='end'
				className="date_pick"

					onChange={(e) => setFgoal((val)=>( {...val, [e.target.name ] : e.target.value}))}
				/>
						<input
							type='color'
				name='color'
						className="date_pick"
						onChange={(e) => setFgoal((val)=>( {...val, [e.target.name ] : e.target.value}))}
				/>

					</div>

                <div className="form-group">
                    <button className='btn btn-block' type='submit'>
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
        <section className="content">
            { goals.length > 0 ? (
                <div className='goals'>
                    {goals.map((goals) => {
						return <GoalItem key={goals._id} goal={goals} onDeleteGoal={onDeleteGoal} />
                    })}
                </div>
            ) : ( 
                <h3 style={{color:'silver'}}>You have no goals</h3>
            )}
        </section>
</>

	)

} 
export default Dashboard

