import './JobItem.css'

const JobItem = props => {
  const {jobItem, checkFunction} = props
  const {label, employmentTypeId} = jobItem
  const checkboxVal = () => {
    checkFunction(employmentTypeId)
  }
  return (
    <li>
      <div className="list">
        <input
          type="checkbox"
          id={employmentTypeId}
          value={employmentTypeId}
          name="check"
          onClick={checkboxVal}
        />
        <label htmlFor={employmentTypeId} className="label">
          {label}
        </label>
      </div>
    </li>
  )
}
export default JobItem
