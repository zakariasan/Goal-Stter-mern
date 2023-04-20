import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { TbEggCracked } from "react-icons/tb";
import { GiFinishLine } from "react-icons/gi";

function GoalItem(props) {
	const [showEditForm, setShowEditForm] = useState(false);

	const onUpdateGoal = () => {
		console.log("update");
	};

	return (
		<div
			className="goal"
			style={{ borderTop: `5px solid ${props.goal.color}` }}
		>
			<div className="headGoal">
				<div style={{ color: "gray" }}>User</div>
				<div className="iconsGoal">
					<RxUpdate className="update" onClick={()=> console.log('coming')} />
					<AiOutlineClose
						className="close"
						onClick={() => props.onDeleteGoal(props.goal._id)}
					/>
				</div>
			</div>
			{showEditForm ? (
				""
			) : (
				<div className="goal-text-wrapper">
					<hr style={{ marginInline: "2rem" }} />
					<p>{props.goal.goal}</p>

					<div className="bootom">
						<span>
							<TbEggCracked />
							{new Date(props.goal.start).toLocaleDateString()}
						</span>
						<span>
							{new Date(props.goal.end).toLocaleDateString()}{" "}
							<GiFinishLine />
						</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default GoalItem;
