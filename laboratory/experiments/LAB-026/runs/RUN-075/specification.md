# SignalPact

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.591216Z
**Run ID**: RUN-075
**Seed**: 1700000075

---

## Architecture

- Architecture: ring_based
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: load_balanced
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: replicated_log
- Structure: ring_buffer
- Commit Method: index_based

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: periodic

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: adaptive
- Model: crash_stop

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 56ms
- Election Timeout Base: 294ms
- Election Timeout Range: 87ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce

## State Machine

- Type: lua_script
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:load_balanced
- concept:term_epochs
- concept:randomized_timeout
- voting:flexible_quorum
- vote_granting:grant_to_highest_term
- log:replicated_log
- log_structure:ring_buffer
- commit:index_based
- recovery:snapshot_transfer
- snapshot:periodic
- dynamic_membership:add_node
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 57
- Elections Succeeded: 37
- Election Success Rate: 64.91%
- Messages Sent: 153
- Commits: 16
- Avg Messages/Commit: 9.56
- Leader Changes: 37
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 41
- Elections Succeeded: 31
- Election Success Rate: 75.61%
- Messages Sent: 157
- Commits: 10
- Avg Messages/Commit: 15.70
- Leader Changes: 31
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 51
- Elections Succeeded: 48
- Election Success Rate: 94.12%
- Messages Sent: 368
- Commits: 20
- Avg Messages/Commit: 18.40
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 63
- Elections Succeeded: 59
- Election Success Rate: 93.65%
- Messages Sent: 455
- Commits: 17
- Avg Messages/Commit: 26.76
- Leader Changes: 59
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

