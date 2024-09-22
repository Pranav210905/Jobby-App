import './JobItem1.css'

const JobItem1 = props => {
  const {salaryItem, radioFunction} = props
  const {label, salaryRangeId} = salaryItem
  const radioVal = () => {
    radioFunction(salaryRangeId)
  }
  return (
    <li>
      <div className="list1">
        <input
          type="radio"
          id={salaryRangeId}
          value={salaryRangeId}
          name="radio"
          onClick={radioVal}
        />
        <label htmlFor={salaryRangeId} className="label">
          {label}
        </label>
      </div>
    </li>
  )
}
export default JobItem1
