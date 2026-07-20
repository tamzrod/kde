# NovaCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.389373Z
**Run ID**: RUN-014
**Seed**: 1700000014

---

## Architecture

- Architecture: ring_based
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: random_winner
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: command_log
- Structure: tree_structure
- Commit Method: quorum_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: adaptive

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: crash_stop

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 112ms
- Election Timeout Base: 481ms
- Election Timeout Range: 141ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:random_winner
- concept:term_epochs
- voting:majority_quorum
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- log:command_log
- log_structure:tree_structure
- commit:quorum_commit
- recovery:snapshot_transfer
- snapshot:adaptive
- dynamic_membership:single_config
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 57
- Elections Succeeded: 44
- Election Success Rate: 77.19%
- Messages Sent: 148
- Commits: 11
- Avg Messages/Commit: 13.45
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 56
- Elections Succeeded: 51
- Election Success Rate: 91.07%
- Messages Sent: 312
- Commits: 19
- Avg Messages/Commit: 16.42
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 56
- Elections Succeeded: 53
- Election Success Rate: 94.64%
- Messages Sent: 421
- Commits: 17
- Avg Messages/Commit: 24.76
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 56
- Elections Succeeded: 53
- Election Success Rate: 94.64%
- Messages Sent: 539
- Commits: 27
- Avg Messages/Commit: 19.96
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

