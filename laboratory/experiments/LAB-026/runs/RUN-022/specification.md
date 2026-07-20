# HelixConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.806515Z
**Run ID**: RUN-022
**Seed**: 1700000022

---

## Architecture

- Architecture: fully_distributed
- Node Type: uniform
- Quorum Type: majority

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: True

## Log Replication

- Type: state_machine
- Structure: tree_structure
- Commit Method: quorum_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: adaptive

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: byzantine

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 275ms
- Election Timeout Base: 472ms
- Election Timeout Range: 132ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce
- term_update

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- voting:write_quorum
- vote_granting:grant_based_on_priority
- concept:vote_revocations
- concept:majority_quorum
- log:state_machine
- log_structure:tree_structure
- commit:quorum_commit
- recovery:hybrid_recovery
- snapshot:adaptive
- dynamic_membership:add_node
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 64
- Elections Succeeded: 48
- Election Success Rate: 75.00%
- Messages Sent: 194
- Commits: 21
- Avg Messages/Commit: 9.24
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 51
- Elections Succeeded: 48
- Election Success Rate: 94.12%
- Messages Sent: 304
- Commits: 23
- Avg Messages/Commit: 13.22
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 53
- Elections Succeeded: 53
- Election Success Rate: 100.00%
- Messages Sent: 505
- Commits: 27
- Avg Messages/Commit: 18.70
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 57
- Elections Succeeded: 57
- Election Success Rate: 100.00%
- Messages Sent: 595
- Commits: 22
- Avg Messages/Commit: 27.05
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

