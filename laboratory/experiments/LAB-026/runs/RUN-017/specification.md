# ForgeProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.543465Z
**Run ID**: RUN-017
**Seed**: 1700000017

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: id_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: hybrid
- Structure: linked_list
- Commit Method: pipeline_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: periodic

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: crash_stop

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 138ms
- Election Timeout Base: 154ms
- Election Timeout Range: 268ms

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
- Liveness: False

---

## Discovered Features

- leader_election:id_based
- concept:term_epochs
- concept:randomized_timeout
- voting:majority_quorum
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- log:hybrid
- log_structure:linked_list
- commit:pipeline_commit
- recovery:state_transfer
- snapshot:periodic
- dynamic_membership:joint_consensus
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 60
- Elections Succeeded: 51
- Election Success Rate: 85.00%
- Messages Sent: 210
- Commits: 16
- Avg Messages/Commit: 13.12
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 46
- Elections Succeeded: 39
- Election Success Rate: 84.78%
- Messages Sent: 245
- Commits: 26
- Avg Messages/Commit: 9.42
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 43
- Elections Succeeded: 43
- Election Success Rate: 100.00%
- Messages Sent: 374
- Commits: 17
- Avg Messages/Commit: 22.00
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 59
- Elections Succeeded: 59
- Election Success Rate: 100.00%
- Messages Sent: 638
- Commits: 24
- Avg Messages/Commit: 26.58
- Leader Changes: 59
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

