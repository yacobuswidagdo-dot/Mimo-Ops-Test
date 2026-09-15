import Badge from './Badge'
import { statusInfo } from '../data/workflowTypes'

function StatusBadge({ status, pill = true }) {
  const info = statusInfo(status)
  return (
    <Badge tone={info.tone} pill={pill}>
      {info.label}
    </Badge>
  )
}

export default StatusBadge
