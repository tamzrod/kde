# CipherConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.840054Z
**Run ID**: RUN-099
**Seed**: 1700000099

---

## Architecture

- Architecture: decentralized
- Node Type: uniform
- Quorum Type: majority

## Leader Election

- Method: rotation
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: read_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: state_machine
- Structure: linked_list
- Commit Method: pipeline_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: leader_change

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: timing

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 453ms
- Election Timeout Base: 490ms
- Election Timeout Range: 150ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:rotation
- concept:randomized_timeout
- voting:read_quorum
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- concept:majority_quorum
- log:state_machine
- log_structure:linked_list
- commit:pipeline_commit
- recovery:incremental_snapshot
- snapshot:leader_change
- dynamic_membership:single_config
- failure_detection:explicit_probe
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 60
- Elections Succeeded: 54
- Election Success Rate: 90.00%
- Messages Sent: 206
- Commits: 22
- Avg Messages/Commit: 9.36
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 64
- Elections Succeeded: 53
- Election Success Rate: 82.81%
- Messages Sent: 304
- Commits: 16
- Avg Messages/Commit: 19.00
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 68
- Elections Succeeded: 60
- Election Success Rate: 88.24%
- Messages Sent: 529
- Commits: 25
- Avg Messages/Commit: 21.16
- Leader Changes: 60
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 47
- Elections Succeeded: 47
- Election Success Rate: 100.00%
- Messages Sent: 490
- Commits: 31
- Avg Messages/Commit: 15.81
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

