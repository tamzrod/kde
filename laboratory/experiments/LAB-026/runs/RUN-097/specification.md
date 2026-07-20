# NovaCore

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.736028Z
**Run ID**: RUN-097
**Seed**: 1700000097

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: True

## Log Replication

- Type: hybrid
- Structure: append_only_array
- Commit Method: index_based

## Recovery

- Strategy: log_catchup
- Snapshot Policy: leader_change

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: swim_like
- Model: byzantine

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 142ms
- Election Timeout Base: 423ms
- Election Timeout Range: 201ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce
- term_update

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:term_epochs
- concept:randomized_timeout
- voting:write_quorum
- vote_granting:grant_to_highest_term
- concept:vote_revocations
- log:hybrid
- log_structure:append_only_array
- commit:index_based
- recovery:log_catchup
- snapshot:leader_change
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 51
- Elections Succeeded: 43
- Election Success Rate: 84.31%
- Messages Sent: 183
- Commits: 18
- Avg Messages/Commit: 10.17
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 49
- Elections Succeeded: 45
- Election Success Rate: 91.84%
- Messages Sent: 284
- Commits: 21
- Avg Messages/Commit: 13.52
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 52
- Elections Succeeded: 42
- Election Success Rate: 80.77%
- Messages Sent: 217
- Commits: 21
- Avg Messages/Commit: 10.33
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 61
- Elections Succeeded: 60
- Election Success Rate: 98.36%
- Messages Sent: 516
- Commits: 23
- Avg Messages/Commit: 22.43
- Leader Changes: 60
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

