import { useState } from 'react'
import * as S from './styles'

interface Employee {
  id: number
  name: string
  email?: string
  phone?: string
  position?: string
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@gym.com',
      phone: '123-456-7890',
      position: 'Trainer'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@gym.com',
      phone: '098-765-4321',
      position: 'Manager'
    }
  ])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Employee | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [confirmRemoveId, setConfirmRemoveId] = useState<number | null>(null)

  const handleAdd = () => {
    const newEmployee: Employee = {
      id: Date.now(),
      name: 'New Employee',
      email: '',
      phone: '',
      position: ''
    }
    setEmployees([...employees, newEmployee])
  }

  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id)
    setEditData({ ...employee })
    setExpandedId(employee.id)
  }

  const handleSaveEdit = (id: number) => {
    if (editData) {
      setEmployees(employees.map((emp) => (emp.id === id ? editData : emp)))
    }
    setEditingId(null)
    setEditData(null)
  }

  const handleRemove = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
    setConfirmRemoveId(null)
  }

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleEditChange = (field: keyof Employee, value: string) => {
    if (editData) {
      setEditData({ ...editData, [field]: value })
    }
  }

  return (
    <S.Container>
      <S.List>
        <S.AddButtonContainer>
          <S.Button onClick={handleAdd}>+ Add Employee</S.Button>
        </S.AddButtonContainer>
        {employees.map((employee) => (
          <div key={employee.id}>
            <S.ListItem
              onClick={() => toggleExpanded(employee.id)}
              style={{ cursor: 'pointer' }}
            >
              <span>{employee.name}</span>
              <S.Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleEdit(employee)
                }}
              >
                Edit
              </S.Button>
              <S.Button
                onClick={(e) => {
                  e.stopPropagation()
                  setConfirmRemoveId(employee.id)
                }}
              >
                Remove
              </S.Button>
            </S.ListItem>
            {expandedId === employee.id && (
              <S.DetailsSection>
                {editingId === employee.id ? (
                  <>
                    <S.DetailField>
                      <label>Name:</label>
                      <input
                        value={editData?.name || ''}
                        onChange={(e) =>
                          handleEditChange('name', e.target.value)
                        }
                      />
                    </S.DetailField>
                    <S.DetailField>
                      <label>Email:</label>
                      <input
                        value={editData?.email || ''}
                        onChange={(e) =>
                          handleEditChange('email', e.target.value)
                        }
                      />
                    </S.DetailField>
                    <S.DetailField>
                      <label>Phone:</label>
                      <input
                        value={editData?.phone || ''}
                        onChange={(e) =>
                          handleEditChange('phone', e.target.value)
                        }
                      />
                    </S.DetailField>
                    <S.DetailField>
                      <label>Position:</label>
                      <input
                        value={editData?.position || ''}
                        onChange={(e) =>
                          handleEditChange('position', e.target.value)
                        }
                      />
                    </S.DetailField>
                    <S.ButtonGroup>
                      <S.Button onClick={() => handleSaveEdit(employee.id)}>
                        Save
                      </S.Button>
                      <S.Button
                        onClick={() => {
                          setEditingId(null)
                          setEditData(null)
                        }}
                      >
                        Cancel
                      </S.Button>
                    </S.ButtonGroup>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>Email:</strong> {employee.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {employee.phone}
                    </div>
                    <div>
                      <strong>Position:</strong> {employee.position}
                    </div>
                  </>
                )}
              </S.DetailsSection>
            )}
          </div>
        ))}
      </S.List>

      {confirmRemoveId && (
        <S.ConfirmModal>
          <S.ConfirmContent>
            <h3>Confirm Removal</h3>
            <p>Are you sure you want to remove this employee?</p>
            <S.ButtonGroup>
              <S.Button onClick={() => handleRemove(confirmRemoveId)}>
                Yes, Remove
              </S.Button>
              <S.Button onClick={() => setConfirmRemoveId(null)}>
                Cancel
              </S.Button>
            </S.ButtonGroup>
          </S.ConfirmContent>
        </S.ConfirmModal>
      )}
    </S.Container>
  )
}

export default Employees
