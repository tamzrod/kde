# NovaFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.695349Z
**Run ID**: RUN-077
**Seed**: 1700000077

---

## Architecture

- Architecture: ring_based
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: timestamp_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: weighted_votes
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: replicated_log
- Structure: linked_list
- Commit Method: batch_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: periodic

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: heartbeat
- Model: crash_stop

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 62ms
- Election Timeout Base: 465ms
- Election Timeout Range: 74ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:weighted_votes
- vote_granting:grant_to_highest_term
- log:replicated_log
- log_structure:linked_list
- commit:batch_commit
- recovery:snapshot_transfer
- snapshot:periodic
- failure_detection:heartbeat
- concept:heartbeat
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 56
- Elections Succeeded: 43
- Election Success Rate: 76.79%
- Messages Sent: 163
- Commits: 14
- Avg Messages/Commit: 11.64
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 56
- Elections Succeeded: 45
- Election Success Rate: 80.36%
- Messages Sent: 262
- Commits: 13
- Avg Messages/Commit: 20.15
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 60
- Elections Succeeded: 59
- Election Success Rate: 98.33%
- Messages Sent: 444
- Commits: 20
- Avg Messages/Commit: 22.20
- Leader Changes: 59
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 58
- Elections Succeeded: 58
- Election Success Rate: 100.00%
- Messages Sent: 695
- Commits: 16
- Avg Messages/Commit: 43.44
- Leader Changes: 58
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

