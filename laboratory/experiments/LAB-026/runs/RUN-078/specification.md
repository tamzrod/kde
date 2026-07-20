# ForgeSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.747477Z
**Run ID**: RUN-078
**Seed**: 1700000078

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: majority

## Leader Election

- Method: term_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: read_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: state_machine
- Structure: append_only_array
- Commit Method: quorum_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: periodic

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: timing

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 56ms
- Election Timeout Base: 359ms
- Election Timeout Range: 170ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- term_update

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:read_quorum
- vote_granting:grant_if_log_newer
- concept:majority_quorum
- log:state_machine
- log_structure:append_only_array
- commit:quorum_commit
- recovery:log_catchup
- snapshot:periodic
- dynamic_membership:remove_node
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 51
- Elections Succeeded: 38
- Election Success Rate: 74.51%
- Messages Sent: 169
- Commits: 18
- Avg Messages/Commit: 9.39
- Leader Changes: 38
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 56
- Elections Succeeded: 44
- Election Success Rate: 78.57%
- Messages Sent: 222
- Commits: 18
- Avg Messages/Commit: 12.33
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 55
- Elections Succeeded: 49
- Election Success Rate: 89.09%
- Messages Sent: 388
- Commits: 15
- Avg Messages/Commit: 25.87
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 55
- Elections Succeeded: 55
- Election Success Rate: 100.00%
- Messages Sent: 497
- Commits: 15
- Avg Messages/Commit: 33.13
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

