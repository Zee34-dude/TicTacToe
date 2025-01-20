import clsx from 'clsx'

export default function Buttons(props) {
  const className = clsx(
    {
      green: props.value == 'X',
      red:props.value=='O'
    }
  )

  return (

    <button className={className} onClick={() => props.handleClick(props.index)}>{props.value}</button>
  )


}