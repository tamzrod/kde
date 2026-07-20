# AnchorCore

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.265972Z
**Run ID**: RUN-088
**Seed**: 1700000088

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: lease_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: weighted_votes
- Vote Granting: grant_to_candidate
- Vote Revocations: True

## Log Replication

- Type: state_machine
- Structure: tree_structure
- Commit Method: quorum_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: leader_change

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: crash_recovery

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 175ms
- Election Timeout Base: 240ms
- Election Timeout Range: 171ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:lease_based
- concept:term_epochs
- voting:weighted_votes
- vote_granting:grant_to_candidate
- concept:vote_revocations
- log:state_machine
- log_structure:tree_structure
- commit:quorum_commit
- recovery:hybrid_recovery
- snapshot:leader_change
- dynamic_membership:full_dynamic
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 58
- Elections Succeeded: 43
- Election Success Rate: 74.14%
- Messages Sent: 157
- Commits: 14
- Avg Messages/Commit: 11.21
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 60
- Elections Succeeded: 33
- Election Success Rate: 55.00%
- Messages Sent: 192
- Commits: 7
- Avg Messages/Commit: 27.43
- Leader Changes: 33
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 47
- Elections Succeeded: 32
- Election Success Rate: 68.09%
- Messages Sent: 243
- Commits: 17
- Avg Messages/Commit: 14.29
- Leader Changes: 32
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 53
- Elections Succeeded: 53
- Election Success Rate: 100.00%
- Messages Sent: 738
- Commits: 31
- Avg Messages/Commit: 23.81
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

