# SignalFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.491554Z
**Run ID**: RUN-035
**Seed**: 1700000035

---

## Architecture

- Architecture: ring_based
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: load_balanced
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: read_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: value_log
- Structure: append_only_array
- Commit Method: index_based

## Recovery

- Strategy: log_catchup
- Snapshot Policy: size_based

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: byzantine

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 217ms
- Election Timeout Base: 460ms
- Election Timeout Range: 181ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- concept:term_epochs
- concept:randomized_timeout
- voting:read_quorum
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- log:value_log
- log_structure:append_only_array
- commit:index_based
- recovery:log_catchup
- snapshot:size_based
- dynamic_membership:remove_node
- failure_detection:phi_accrual
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 50
- Elections Succeeded: 45
- Election Success Rate: 90.00%
- Messages Sent: 183
- Commits: 15
- Avg Messages/Commit: 12.20
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 58
- Elections Succeeded: 50
- Election Success Rate: 86.21%
- Messages Sent: 368
- Commits: 21
- Avg Messages/Commit: 17.52
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 71
- Elections Succeeded: 58
- Election Success Rate: 81.69%
- Messages Sent: 400
- Commits: 21
- Avg Messages/Commit: 19.05
- Leader Changes: 58
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 65
- Elections Succeeded: 55
- Election Success Rate: 84.62%
- Messages Sent: 512
- Commits: 20
- Avg Messages/Commit: 25.60
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

