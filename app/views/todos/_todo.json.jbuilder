json.extract! todo, :id, :due, :task, :created_at, :updated_at
json.url todo_url(todo, format: :json)
