# ForgeCore

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.852148Z
**Run ID**: RUN-080
**Seed**: 1700000080

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: id_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: False

## Log Replication

- Type: state_machine
- Structure: linked_list
- Commit Method: index_based

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: leader_change

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: adaptive
- Model: byzantine

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 195ms
- Election Timeout Base: 199ms
- Election Timeout Range: 144ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:id_based
- concept:term_epochs
- concept:randomized_timeout
- voting:majority_quorum
- vote_granting:grant_to_candidate
- log:state_machine
- log_structure:linked_list
- commit:index_based
- recovery:snapshot_transfer
- snapshot:leader_change
- dynamic_membership:add_node
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 60
- Elections Succeeded: 41
- Election Success Rate: 68.33%
- Messages Sent: 172
- Commits: 16
- Avg Messages/Commit: 10.75
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 71
- Elections Succeeded: 52
- Election Success Rate: 73.24%
- Messages Sent: 278
- Commits: 12
- Avg Messages/Commit: 23.17
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 53
- Elections Succeeded: 51
- Election Success Rate: 96.23%
- Messages Sent: 384
- Commits: 24
- Avg Messages/Commit: 16.00
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 59
- Elections Succeeded: 57
- Election Success Rate: 96.61%
- Messages Sent: 537
- Commits: 23
- Avg Messages/Commit: 23.35
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

