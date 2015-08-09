curl -X POST http://127.0.0.1:3000/events/ -H "Content-Type: application/json" --data @test-events.data
curl -X POST http://127.0.0.1:3000/register/ -H "Content-Type: application/json" --data @test-users.data
